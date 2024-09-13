/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F57C00',          // Orange foncé
        secondary: '#FF9800',        // Orange clair
        background: '#F4F4F4',       // Gris très clair pour le fond
        textPrimary: '#333333',      // Gris foncé pour le texte principal
        textSecondary: '#666666',    // Gris moyen pour le texte secondaire
        error: '#FF4C4C',            // Rouge pour les erreurs
        accent: '#FF6F00',           // Orange accentué
      },
      fontFamily: {
        sans: ["Roboto", "Open Sans", "Lato", "sans-serif"],
        heading: ["Montserrat", "Poppins", "Merriweather", "serif"],
      },
      fontSize: {
        title: "24px",
        subtitle: "20px",
        body: "16px",
        small: "14px",
      },
    },
  },
  plugins: [],
};
