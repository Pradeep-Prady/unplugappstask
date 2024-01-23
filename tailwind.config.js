/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".link": {
      border: "2px solid black",
      "border-radius": "2px",
      cursor: "pointer",
      "font-weight": 600,
      color: "black",
    },
    ".box": {
      background: "rgba(255, 255, 255, 0)",
      "border-radius": "16px",
      "box-shadow": "0 4px 30px rgba(0, 0, 0, 0.1)",
      "backdrop-filter": "blur(20px)",
      "-webkit-backdrop-filter": "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
  });
});
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        mydark: "#BBAB8C",
        mymedium: "#DED0B6",
        mylight: "#FAEED1",
        mywhite: "#FDF7E4",
      },
    },
  },
  plugins: [Myclass],
};
