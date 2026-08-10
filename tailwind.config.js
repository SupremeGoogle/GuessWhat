/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        accent: "var(--accent)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-pink": "var(--accent-pink)",
        "card-bg": "var(--card-bg)",
      },
    },
  },
  plugins: [],
}
