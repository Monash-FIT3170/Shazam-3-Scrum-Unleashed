/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#377AE3",
        "primary-dark": "#14171D",
      },
    },
  },
  plugins: [],
};
