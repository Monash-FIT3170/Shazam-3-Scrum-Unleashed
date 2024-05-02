# Shazam-3-scrum-unleashed

Project 3 - FIT3170 - 2024

Team Members:

    - Aaron Abbott (aabb0010@student.monash.edu) Repo Admin
    - Patrick (pedw0004@student.monash.edu)
    - James Chea (jche0346@student.monash.edu)
    - Michael (mwan0129@student.monash.edu)
    - Suryadeep Singh (ssin0061@student.monash.edu)
    - Alexander Chan (acha0145@student.monash.edu)
    - Anand Vannalath (avan0055@student.monash.edu)
    - Victor Huang (vhua006@student.monash.edu)
    - Sandy (ssen0027@student.monash.edu)
    - Snekith (skar0053@student.monash.edu)
    - Jovan Vales (jval0006student.monash.edu)
    - Fathy Abdelshahid (fabd0009@student.monash.edu)
    - Rory Tobin-Underwood (rtob0002@student.monash.edu)

# Repo Structure
- [client](client) : contains all the front end components required for the web client.
- [server](server)  : contains all the backend (networking, storage and game logic) for the server.
- [types](types) : contains interfaces and types which both the client and server will use, generally for communicate with each other.

# Prepare for development

1. Ensure you have the latest version of node v22 installed on your machine. You can download it from the following link: https://nodejs.org/en/
2. Move into the [client](client) directory of the project by typing the command `cd client`.
3. Open another terminal and then move into the [server](server) directory `cd server`.
4. Install dependencies in both [client](client) and [server](server) by running `npm install` in both terminals.
5. Run both the [client](client) and [server](server) by running `npm run dev` in both terminals.

# Recommended steps (not strictly required)

1. Use vscode as your code editor.
2. Install the following extensions:
   - Prettier - Code formatter
   - ESLint
   - Typescript

# Before committing/merge request
Remember to run the 2 following commands to ensure the code passes the automated linting test
1. `npm run format`
2. `npm run lint`