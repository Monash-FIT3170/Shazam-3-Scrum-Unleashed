/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#377AE3",
        "primary-dark": "#14171D",
        "spectator-bg": "#1A88AB",
        "spectator-text": "#43DFE9",
        "rock" : "#E943E9",
        "paper" : "#E943E9",
        "scissors" : "#E943E9",
        "shazam" : "#E943E9",
        "green" : "#E943E9",
        "green-bg" : "#E943E9",
        "red" : "#E943E9",
        "saturated-red" : "#E943E9"
      },
    },
  },
  plugins: [],
};
