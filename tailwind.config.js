/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightBeige: "#F9F3EE",
        beige: "#F2E3CE",
        white: "white",
      },
      minHeight: {
        "100vh": "100vh",
        "91vh": "91vh",
        "90vh": "90vh",
        "89vh": "89vh",
        "80vh": "80vh",
        "15vh": "15vh",
        "11vh": "11vh",
        "10vh": "10vh",
        "9vh": "9vh",
      },
      height: {
        "100vh": "100vh",
        "91vh": "91vh",
        "90vh": "90vh",
        "80vh": "80vh",
        "15vh": "15vh",
        "11vh": "11vh",
        "10vh": "10vh",
        "9vh": "9vh",
      },
      zIndex: {
        z1: "1",
        z2: "2",
      },
      fontFamily: {
        libreB: `"Libre Baskerville","serif"`,
      },
    },
  },
  plugins: [],
};
