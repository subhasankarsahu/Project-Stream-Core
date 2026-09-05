/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F0F0F",
        surface: "#181818",
        line: "#303030",
        accent: "#FF0000",
        "accent-hover": "#CC0000",
        muted: "#AAAAAA",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
}
