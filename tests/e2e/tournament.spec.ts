import { test, expect, Browser, Page } from "@playwright/test";

// Utility function to create a tournament and get the game code
async function createTournament(page: Page) {
  await page.goto("/");
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
  await page.goto("/");
  await page.getByText("JOIN GAME").click();

  const randomName = generateUniqueName(existingNames);
  await page.getByTestId("player-name-input").fill(randomName);

  await page.getByTestId("tournament-code-input").fill(gameCode);
  await page.getByText("Join Room").click();

  return page;
}

async function autoClickMoves(page: Page) {
  while (true) {
    const move = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    try {
      const optionButton = page.getByTestId(move);
      await optionButton.waitFor({ timeout: 0 });
      await optionButton.click();
    } catch {
      break;
    }
  }
}

test.describe("Tournament Game Automation", () => {
  test("Create and manage a tournament", async ({ browser }) => {
    const page = await browser.newPage();
    const { gameCode, page: hostPage } = await createTournament(page);
    expect(gameCode).not.toBeNull();

    const existingNames = new Set<string>();
    const joinPromises: Promise<Page>[] = [];
    const numPlayers = process.env.CI ? 3 : 50;
    for (let i = 0; i < numPlayers; i++) {
      joinPromises.push(
        joinGame(gameCode as string, browser, existingNames, i + 1)
      );
    }

    const playerPages = await Promise.all(joinPromises);
    await expect(hostPage.getByTestId("lobby-player-item")).toHaveCount(
      playerPages.length
    );

    await hostPage.getByText("Start Tournament").click();

    for (let context of playerPages) {
      autoClickMoves(context);
    }

    await Promise.all(
      playerPages.map((page) => page.getByText("Winner").waitFor())
    );
  });
});
