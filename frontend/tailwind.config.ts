import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'offWhite': '#F8F8F8',
        'lightGrey': '#E6E6E6',
        'offGrey': '#CFC2C2',
      },
      fontFamily: {
        'title': ['Protest Strike', 'sans-serif'],
        'subTitle': ['Rubik', 'sans-serif'],
        'default': ['Roboto Slab', 'serif']
      },
      width: {
        '140': '27rem',
        '160': '40rem',
      },
      height: {
        'header': '25%',
        'banner': '76.2%',
        'subBanner': '75%'

      },
      screens: {
        'sm': '460px',
        'md': '715px'
      }
    },
  },
  plugins: [],
};
export default config;
