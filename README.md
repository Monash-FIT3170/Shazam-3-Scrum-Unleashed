# Shazam-3-Scrum-Unleashed

### Project 3 - FIT3170 - 2024

## Team Members
- Aaron Abbott (aabb0010@student.monash.edu)
- Patrick (pedw0004@student.monash.edu)
- James Chea (jche0346@student.monash.edu)
- Levi Kogan (lkog0002@student.monash.edu)
- Michael (mwan0129@student.monash.edu)
- Suryadeep Singh (ssin0061@student.monash.edu)
- Alexander Chan (acha0145@student.monash.edu)
- Anand Vannalath (avan0055@student.monash.edu)
- Victor Huang (vhua006@student.monash.edu)
- Sandy (ssen0027@student.monash.edu)
- Snekith (skar0053@student.monash.edu)
- Jovan Vales (jval0006@student.monash.edu)
- Fathy Abdelshahid (fabd0009@student.monash.edu)
- Rory Tobin-Underwood (rtob0002@student.monash.edu)
- Thomas Rumble (trum0001@student.monash.edu)

## Developed Application
The developed application is currently available [here](https://3170.fit/) to be enjoyed.

## Repo Structure

- [client](client) : contains all the front end components required for the web client.
- [server](server)  : contains all the backend (networking, storage and game logic) for the server.
- [types](types) : contains interfaces and types which both the client and server will use, generally for communicate with each other.
- [tests](tests) : contains E2E tests for our application to ensure functionality.

## Prepare for development

1. Ensure you have the latest version of node v22 installed on your machine. You can download it from the following link: https://nodejs.org/en/
2. Move into the [client](client) directory of the project by typing the command `cd client`.
3. Open another terminal and then move into the [server](server) directory `cd server`.
4. Install dependencies in both [client](client) and [server](server) by running `npm install` in both terminals.
5. Run both the [client](client) and [server](server) by running `npm run dev` in both terminals.

## Recommended steps (not strictly required)

1. Use vscode as your code editor.
2. Install the following extensions:
   - Prettier - Code formatter
   - ESLint
   - Typescript
3. Refer to our handover video for a walkthrough of the architecture as well as a deep dive into the code and how the application works. The link can be found at: https://drive.google.com/file/d/1BLmVeHUXfNqvcXFwk-ovQhECkiHtJxus/view

## Before committing/merge request
Remember to run the 2 following commands to ensure the code passes the automated linting test
1. `npm run format`
2. `npm run lint`

## Testing
To run the E2E tests locally, complete the following instructions.

1. Start the server and client, as outlined in [Prepare for development](#Prepare-for-development)
2. Move into the [tests](tests) directory of the project by typing the command `cd tests`.
3. Install dependencies in [tests](tests) by running `npm install` in the terminal.
4. Run the test by running `npm run test` in terminal.

### Notes
- Running `npm run test -- --headed` will create and display the tabs on the local device.
- Occasionally the test will stall when a client browser fails to join, this can be fixed by manually clicking the join button.
- Occasionally a client browser will not be updated on a match start, refreshing will connect the client.



