import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Tech16App from './Tech16';

// Tech16-specific blue theme
const tech16Theme = {
  bg: "#ffffff",
  bgLight: "#f5f5f5",
  primary: "#3498db",
  text_primary: "#2c3e50",
  text_secondary: "#5a6c7d",
  card: "#ffffff",
  card_light: '#f8f9fa',
  button: "#3498db",
  white: "#FFFFFF",
  black: "#000000",
  border: "#e0e0e0",
};

function App() {
  return (
    <ThemeProvider theme={tech16Theme}>
      <Router>
        <Tech16App />
      </Router>
    </ThemeProvider>
  );
}

export default App;
