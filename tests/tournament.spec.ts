import { test, expect, Browser, Page } from "@playwright/test";

const baseURL = "http://localhost:5173/shazam-3-scrum-unleashed/";

// Utility function to create a tournament and get the game code
async function createTournament(page: Page) {
  await page.goto(baseURL);
  await page.getByText("CREATE GAME").click();
  await page.getByText("Create Tournament").click();
  const gameCode = await page.getByTestId("tournament-code").textContent();
  return { gameCode, page };
}

// Utility function to generate a unique random name
function generateUniqueName(existingNames: Set<string>) {
  const adjectives = [
    "Quick",
    "Bright",
    "Silent",
    "Eager",
    "Bold",
    "Clever",
    "Brave",
    "Fierce",
    "Swift",
    "Wise",
  ];
  const nouns = [
    "Tiger",
    "Eagle",
    "Shark",
    "Lion",
    "Wolf",
    "Falcon",
    "Panther",
    "Dragon",
    "Leopard",
    "Hawk",
  ];
  let name;
  do {
    name =
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      nouns[Math.floor(Math.random() * nouns.length)];
  } while (existingNames.has(name));
  existingNames.add(name);
  return name;
}

async function joinGame(
  gameCode: string,
  browser: Browser,
  existingNames: Set<string>,
  index: number
) {
  await new Promise((resolve) => setTimeout(resolve, 100 * index));

  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.getByText("JOIN GAME").click();

  const randomName = generateUniqueName(existingNames);
  await page.getByTestId("player-name-input").fill(randomName);

  await page.getByTestId("tournament-code-input").fill(gameCode);
  await page.getByText("Join Room").click();

  return page;
}

async function handleRound(page: Page) {
  // TODO - Fix this error catching rubbish
  let round = 0;
  while (true) {
    round++;

    try {
      const move = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
      const moveButton = await page.waitForSelector(`[data-testid="${move}"]`, {
        timeout: 1000,
      });
      if (moveButton) {
        await moveButton.click();
      }
    } catch {}
  }
}

test.describe("Tournament Game Automation", () => {
  test("Create and manage a tournament", async ({ browser }) => {
    const page = await browser.newPage();
    const { gameCode, page: hostPage } = await createTournament(page);
    expect(gameCode).not.toBeNull();

    const existingNames = new Set<string>();
    const joinPromises: Promise<Page>[] = [];
    for (let i = 0; i < 2; i++) {
      joinPromises.push(
        joinGame(gameCode as string, browser, existingNames, i + 1)
      );
    }

    const playerPages = await Promise.all(joinPromises);

    await expect(hostPage.getByTestId("lobby-player-item")).toHaveCount(playerPages.length);
    await hostPage.getByText("Start Tournament").click();

    const playerRoundPromises: Promise<void>[] = [];
    for (let context of playerPages) {
      playerRoundPromises.push(handleRound(context));
    }

    await Promise.all(playerRoundPromises);

    for (const page of playerPages) {
      expect(page.locator("Winner").first()).toBeVisible();
    }
  });
});
