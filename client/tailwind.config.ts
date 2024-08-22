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
        textanim: {
          from: {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.8)",
          },
          to: {
            opacity: "0",
          },
        },
        // SHAZAM text img keyframes
        shazamanim: {
          from: {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.75)",
          },
          to: {
            opacity: "1",
            transform: "scale(1.75)",
          },
          // to: {
          //   opacity: "0",
          // }
        },
        shazamanim2: {
          from: {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.25)",
          },
          to: {
            opacity: "1",
            transform: "scale(1.25)",
          },
          // to: {
          //   opacity: "0",
          // }
        },
        // explosion keyframes
        explosionanim: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "1",
            transform: "scale(30)",
          },
        },
        // hands punching in from bottom keyframes
        translateinbottom: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
            transform: "translate(0, 20%)",
          },
        },
        // hands punching in from top keyframes
        translateintop: {
          from: {
            opacity: "0",
            transform: "scaleY(-1) translate(0, 100%)",
          },
          to: {
            opacity: "1",
            transform: "scaleY(-1) translate(0, 20%)",
          },
        },
      },
      animation: {
        textanim:
          "textanim 1s ease-out var(--textanim-delay, 0) forwards",
        shazamanim:
          "shazamanim 1s ease-out var(--shazamanim-delay, 0) forwards",
        shazamanim2:
          "shazamanim2 1s ease-out var(--shazamanim-delay, 0) forwards",
        explosionanim:
          "explosionanim 1.5s ease-out var(--explosionanim-delay, 0) forwards",
        translateinbottom:
          "translateinbottom 0.5s ease-out var(--translateinbottom-delay, 0) forwards",
        translateintop:
          "translateintop 0.5s ease-out var(--translateintop-delay, 0) forwards",
      },
    },
  },
  plugins: [],
};
