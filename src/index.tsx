import { StrictMode } from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#202124',
    }
  },
  typography: {
    h1: {
      fontFamily: '"Euclid Circular B", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2rem',
      letterSpacing: '0.75px',
      fontWeight: 500,
    },
    caption: {
      fontFamily: '"Euclid Circular B", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.5px',
      fontSize: '0.85rem',
    },
    h2: {
      fontFamily: '"Euclid Circular B", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.5px',
      fontSize: '1.25rem',
    },
  },
})

render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
		</BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)