// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // <-- assure-toi que c’est bien là
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#004aad"
    }},
  },
  plugins: [],
}
