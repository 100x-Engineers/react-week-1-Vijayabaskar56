/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        twitterBluedefault: "#1D9BF0",
        twitterBlue: "#1D9BF0",
        blueWash: "rgba(117, 190, 239, 0.2)",
        Secondary: "rgba(255, 255, 255, 0.6)",
        buttonStock: "#546A7A",
        searchbarFill: "#212327",
        cardFill: "#16181C",
        success: "#16181C",
        error: "#16181C",
        neutral50: "#F9F9F9",
        neutral100: "#F9F9F9",
        neutral200: "#E4E4E4",
        neutral300: "#D3D3D3",
        neutral400: "#A2A2A2",
        neutral500: "#737373",
        neutral600: "#525252",
        neutral700: "#404040",
        neutral800: "#262626",
        neutral900: "#171717",
        neutral900shade: "rgba(0, 0, 0, 0.60)",
        neutral950: "#0A0A0A",
        neutral1000: "#000",
      },
      width: {
        w24: "324px",
        w01: "350px",
        w02: "455px",
        w03: "360px",
      },
      height: {
        h01: "360px",
        h02: "150px",
      },
      boxShadow: {
        btnShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "px-secondary": "font-chirp",
      },
      fontWeight: {
        bold: 700,
      },
      fontSize: {
        // Normal Screen
        base: "1rem",
        "5xl": "1.5rem",
        inherit: "inherit", 
        fs01: "48px",
        fs02: "2rem",
      },
      borderRadius: {
        br01: "65px",
      },
      transform: {
        "-translate-y-1/4": "-25%",
        "scale-75": "0.75",
      },
    },
  },
  plugins: [],
};
