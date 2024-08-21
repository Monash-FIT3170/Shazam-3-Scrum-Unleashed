/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#377AE3",
        "primary-dark": "#14171D",
        "spectator-bg": "#1A88AB",
        "spectator-text": "#43DFE9",
        rock: "#E943E9",
        paper: "#E943E9",
        scissors: "#E943E9",
        shazam: "#E943E9",
        green: "#E943E9",
        "green-bg": "#E943E9",
        red: "#E943E9",
        "saturated-red": "#E943E9",
        "bright-red": "#FF0000",
      },
      keyframes: {
        // ROCK, PAPER text keyframes
        customping: {
          from: {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.8)"
          },
          to: {
            opacity: "0",
          }
        },
        // SHAZAM text img keyframes
        customping2: {
          from: {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.75)"
          },
          to: {
            opacity: "1",
            transform: "scale(1.75)"
          }
          // to: {
          //   opacity: "0",
          // }
        },
        // explosion keyframes
        customping3: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "1",
            transform: "scale(30)"
          }
        },
        // hands punching in from bottom keyframes
        translateinbottom: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
            transform: "translate(0, 20%)"
          }
        },
        // hands punching in from top keyframes
        translateintop: {
          from: {
            opacity: "0",
            transform: "scaleY(-1) translate(0, 100%)"
          },
          to: {
            opacity: "1",
            transform: "scaleY(-1) translate(0, 20%)",
          },
        }
      },
      animation: {
        customping: "customping 1s ease-out var(--customping-delay, 0) forwards",
        customping2: "customping2 1s ease-out var(--customping2-delay, 0) forwards",
        customping3: "customping3 1.5s ease-out var(--customping3-delay, 0) forwards",
        translateinbottom: "translateinbottom 0.5s ease-out var(--translateinbottom-delay, 0) forwards",
        translateintop: "translateintop 0.5s ease-out var(--translateintop-delay, 0) forwards"
      },
    },
  },
  plugins: [],
};
