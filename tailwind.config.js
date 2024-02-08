/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Atur sesuai struktur proyek Anda
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Luckiest Guy', 'cursive'],
      },
    },
  },
  plugins: [],
};
