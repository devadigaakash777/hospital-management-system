module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#1ED760',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        border: '#E0E0E0',
        card: '#FAFAFA',
        textPrimary: '#121212',
        textSecondary: '#535353',
        error: '#D32F2F',
        success: '#1DB954',
      },
    },
  },
  plugins: [],
};

// Tells Tailwind where your files are so it only generates styles for classes you actually use
// content: ["./src/**/*.{js,jsx,ts,tsx}"] scans all your components
// presets: [require("nativewind/preset")] adds React Native specific styles