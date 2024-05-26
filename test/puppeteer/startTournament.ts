import puppeteer from "puppeteer";
import { Page, Browser } from "puppeteer";

const baseURL = "http://localhost:5173/shazam-3-scrum-unleashed/";

async function clickButtonFromText(page: Page, text: string) {
  const button = await page.waitForSelector(
    `xpath///button[contains(., "${text}")]`
  );
  if (button) {
    await button.click();
  } else {
    console.log(button);
    throw new Error(text + " button not found");
  }
}

// Function to create a tournament and get the game code
async function createTournament(browser: Browser) {
  const page = await browser.newPage();
  await page.goto(baseURL);

  await clickButtonFromText(page, "CREATE GAME");
  await clickButtonFromText(page, "Create Tournament");

  // Wait for the game code to appear and retrieve it
  await page.waitForSelector('[data-testid="tournament-code"]'); // Replace with actual game code selector
  const gameCode = await page.$eval(
    '[data-testid="tournament-code"]',
    (el: Node) => el.textContent
  ); // Replace with actual game code element selector

  return { gameCode, page };
}

// Function to generate a unique random name
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

// Function to join the game and handle rounds
async function joinGame(
  gameCode: string,
  browser: Browser,
  existingNames: Set<string>,
  contextIndex: number
) {
  await sleep(100 * contextIndex);
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.goto(baseURL, { timeout: 0 }); // Replace with your actual website URL

  await clickButtonFromText(page, "JOIN GAME");
  // Enter a unique random name
  const randomName = generateUniqueName(existingNames);
  await page.waitForSelector('[data-testid="player-name-input"]'); // Replace with actual game code selector
  await page.type('[data-testid="player-name-input"]', randomName); // Replace with actual name input field selector

  await page.waitForSelector('[data-testid="tournament-code-input"]'); // Replace with actual game code selector
  await page.type('[data-testid="tournament-code-input"]', gameCode); // Replace with actual input field selector

  await clickButtonFromText(page, "Join Room");

  // TODO
  // await page.keyboard.press('Enter');
  return page;
}

async function handleRound(page: Page) {
  // Loop for multiple rounds until the winner page is detected or spectator menu appears
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

    // try {
    //     await page.waitForSelector('#winner_page_element_id'); // Adjust selector and timeout as needed
    // } catch (error) {
    //     // Continue to the next round
    // }

    // Check for spectator menu
    // try {
    //     await page.waitForSelector('#spectator_menu_element_id'); // Replace with actual spectator menu selector

    //     // Select an emoji option
    //     const emojiOption = await page.$('#emoji_option_selector'); // Replace with actual emoji option selector
    //     if (emojiOption) {
    //         await emojiOption.click();
    //     }

    //     // Continuously click randomly on the page
    //     setInterval(async () => {
    //         const x = Math.floor(Math.random() * page.viewport()?.width ?? 0);
    //         const y = Math.floor(Math.random() * page.viewport()?.height ?? 0);
    //         await page.mouse.click(x, y);
    //     }, 1000); // Adjust the interval as needed

    // } catch (error) {
    //     // Continue to the next round
    // }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--incognito"],
  });
  const { gameCode, page: hostPage } = await createTournament(browser);

  if (!gameCode) {
    throw new Error("Game code not found");
  }

  // Open 100 tabs and join the game
  const playerPromises: Promise<Page>[] = [];
  const existingNames = new Set<string>();
  for (let i = 0; i < 100; i++) {
    playerPromises.push(joinGame(gameCode, browser, existingNames, i + 1));
  }

  const playerContexts = await Promise.all(playerPromises);

  await clickButtonFromText(hostPage, "Start Tournament");

  for (let context of playerContexts) {
    handleRound(context);
  }

  // await browser.close();
})();
