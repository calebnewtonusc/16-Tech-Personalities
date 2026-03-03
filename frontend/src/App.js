import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Tech16App from './Tech16';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Tech16-specific blue theme
const tech16Theme = {
  bg: "#f2f2f7",
  bgLight: "#ffffff",
  primary: "#007AFF",
  primaryLight: "#e8f0fe",
  text_primary: "#1c1c1e",
  text_secondary: "#3a3a3c",
  text_muted: "#8e8e93",
  card: "#ffffff",
  card_light: "#f2f2f7",
  button: "#007AFF",
  white: "#FFFFFF",
  black: "#1c1c1e",
  border: "rgba(60,60,67,0.12)",
  separator: "rgba(60,60,67,0.08)",
  shadow_sm: "0 1px 6px rgba(0,0,0,0.07)",
  shadow_md: "0 4px 24px rgba(0,0,0,0.10)",
};

function App() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <ThemeProvider theme={tech16Theme}>
      <Router>
        <Tech16App />
      </Router>
    </ThemeProvider>
  );
}

export default App;
