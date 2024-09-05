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
        paper: "#2DC89E",
        scissors: "#377AE3",
        shazam: "#FFC700",
        green: "#65DB71",
        "green-bg": "#45BD67",
        red: "#FF5959",
        "saturated-red": "#F01010",
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
        flyIn: {
          "0%": {
            opacity: "0",
            scale: "1000%",
          },
          "100%": {
            opacity: "1",
            scale: "100%",
          },
        },
        fade50: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.5",
          },
        },
        elimbox: {
          "0%": { backgroundColor: "rgba(255,0,0,0.4)", overflow: "clip" },
          "10%": { backgroundColor: "#22026c" },
          "20%": { backgroundColor: "rgba(255,0,0,0.4)" },
          "30%": { backgroundColor: "#22026c" },
          "40%": { backgroundColor: "rgba(255,0,0,0.4)" },
          "50%": { backgroundColor: "#22026c" },
          "60%": { backgroundColor: "rgba(255,0,0,0.4)" },
          "70%": { backgroundColor: "#22026c" },
          "80%": { backgroundColor: "rgba(255,0,0,0.4)" },
          "90%": { backgroundColor: "#22026c" },
          "100%": {
            backgroundColor: "rgba(255,0,0,0.4)",
            borderColor: "#FF5959",
            overflow: "clip",
          },
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
          "100%": { transform: "translate(-1px,-1px) rotate(0)" },
        },
      },
      animation: {
        textanim: "textanim 1s ease-out var(--textanim-delay, 0) forwards",
        shazamanim:
          "shazamanim 1s ease-out var(--shazamanim-delay, 0) forwards",
        shazamanim2:
          "shazamanim2 1s ease-out var(--shazamanim-delay, 0) forwards",
        explosionanim:
          "explosionanim 1.5s ease-out var(--explosionanim-delay, 0) forwards",
        translateinbottom:
          "translateinbottom 0.5s ease-out var(--translateinbottom-delay, 0) forwards",
        translateintop:
          "translateintop 1s ease-out var(--translateintop-delay, 0) forwards",
        flyIn: "flyIn 0.25s ease-in forwards, shake 0.5s ease-in 0.25s forwards 1",
        elimcross:
          "flyIn 0.25s ease-in forwards, fade50 0.5s ease-in 1.2s forwards 1",
        elimbox:
          "elimbox 0.5s ease-in 0.2s forwards 1, shake 0.5s ease-in 0.2s forwards 1",
        shake: "shake 0.5s ease-in var(--shake-delay, 0) forwards 1",
      },
    },
  },
  plugins: [],
};
