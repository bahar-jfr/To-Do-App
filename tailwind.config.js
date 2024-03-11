/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark_purple: "#6200ea",
        light_purple: "#7926ed",
        light_gray: "#ebebeb",
        blue: "#0d6efd",
        pink: "#dc3545",
        yellow: "#ffc107",
        green: "#2e7d32",
        black_overlay: "#120d0d",
      },
      spacing: {
        "42%": "42%",
        "38%": "38%",
      },
    },
  },
  plugins: [],
};
