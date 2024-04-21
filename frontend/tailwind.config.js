/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
    colors: {
      primarybuttonColor: '#377AE3',
      inputColor: "#14171D", 
    },
  },
},
  plugins: [],
}
