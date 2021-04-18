import './App.css'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'
import Page from './components/Page'

function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <Page />
                </AppContextProvider>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App
