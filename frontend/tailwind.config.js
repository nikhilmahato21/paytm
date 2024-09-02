/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        moneyYellow: '#EAE7DC',   // Example custom color
        moneyRed: '#ED5A4F',
        moneyBrown:"#D8C3A4",
        moneyBlack:"#8E8D89"   // Example custom color
        // Add more custom colors here
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require('daisyui'),],
};
