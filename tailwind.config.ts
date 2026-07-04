import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
   screens:{
    xs:"320px",
    sm:"375px",
    sml:"500px",
    md:"667px",
    mdl:"768px",
    lg:"960px",
    lgl:"1024px",
    xl:"1280px",
   
   },
   colors:{
    amazon_blue:"#0f172a", // Premium Slate 900
    amazon_light:"#1e293b", // Premium Slate 800
    amazon_yellow:"#6366f1", // Modern Indigo
    amazon_yellow_shadow:"#4f46e5", // Deep Indigo
    lightText:"#94a3b8" // Slate 400
   },
   fontFamily:{
    bodyFont:['Poppins', 'sans-serif']
   }
    },
  },
  plugins: [],
}
export default config
