
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontWeight: {
      thin: "100",
      light: "300",
      regular: "normal",
      "semi-bold": "600",
      bold: "bold",
      "extra-bold": "800",
      black: "900",
      "extra-black": "950",
    },
    extend: {
      fontFamily: {
        main: ["var(--font-main)"],
      },
    },
  },
  plugins: [],
};
