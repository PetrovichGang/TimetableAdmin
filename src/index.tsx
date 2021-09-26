import { StrictMode } from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#202124',
    }
  },
  typography: {
    h1: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
    },
    body2: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
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