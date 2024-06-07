import { test, expect, Browser, Page } from "@playwright/test";

type AdverseUserInteraction = "refresh" | "leave" | "slow";

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
      " " +
      nouns[Math.floor(Math.random() * nouns.length)] +
      " " +
      String(Math.floor(Math.random() * 1000));
  } while (existingNames.has(name));
  existingNames.add(name);
  return name;
}

async function joinGame(
  gameCode: string,
  browser: Browser,
  existingNames: Set<string>,
  index: number,
) {
  await new Promise((resolve) => setTimeout(resolve, 100 * index));

  const page = await browser.newPage();
  await page.goto("/");
  await page.getByText("JOIN GAME").click();

  const randomName = generateUniqueName(existingNames);
  await page.getByTestId("player-name-input").fill(randomName);

  await page.getByTestId("tournament-code-input").fill(gameCode);
  await page.getByText("Join Game").click();

  await expect(page).toHaveURL(/player-screen/, { timeout: 30000 });

  return page;
}

async function autoClickMoves(
  page: Page,
  adverseUserInteraction: AdverseUserInteraction = null,
) {
  let i = 1;
  while (true) {
    if (adverseUserInteraction === "refresh" && i % 10 === 0) {
      await page.reload();
    } else if (adverseUserInteraction === "leave" && i % 10 === 0) {
      await page.close();
      return;
    } else if (adverseUserInteraction === "slow" && i % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 15000));
    }

    const move = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    try {
      const optionButton = page.getByTestId(move);
      await optionButton.click({ timeout: 0 });
      i++;
    } catch {
      // If error is thrown, stop making moves
      break;
    }
    // Make sure the buttons disspear after you click them
    await expect(page.getByTestId(move)).toBeHidden();
  }
}

test.describe("Tournament Game Automation", () => {
  test("Create and manage a tournament", async ({ browser }) => {
    const page = await browser.newPage();
    const { gameCode, page: hostPage } = await createTournament(page);
    expect(gameCode).not.toBeNull();

    const existingNames = new Set<string>();
    const joinPromises: Promise<Page>[] = [];
    const numPlayers = process.env.CI ? 8 : 50;
    for (let i = 0; i < numPlayers; i++) {
      joinPromises.push(
        joinGame(gameCode as string, browser, existingNames, i + 1),
      );
    }

    const playerPages = await Promise.all(joinPromises);
    await expect(hostPage.getByTestId("lobby-player-item")).toHaveCount(
      playerPages.length,
    );

    await hostPage.getByText("Start Tournament").click();

    for (let [i, context] of playerPages.entries()) {
      let userInteraction: AdverseUserInteraction = null;

      if (i % 10 === 0) {
        userInteraction = "slow";
      }

      if ((i + 1) % 10 === 0) {
        userInteraction = "leave";
      }

      if ((i + 2) % 10 === 0) {
        userInteraction = "refresh";
      }

      autoClickMoves(context, userInteraction);
    }

    await Promise.all(
      playerPages.map(
        (page) =>
          new Promise<void>(async (resolve) => {
            try {
              await page.getByText("Winner").waitFor({ timeout: 0 });
            } catch (error) {}
            resolve();
          }),
      ),
    );
  });
});
