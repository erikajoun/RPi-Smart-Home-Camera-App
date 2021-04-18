import React, { useState } from 'react'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({
        ip: null,
        port: null,

        page: 'landing',
        settingsOpen: false,
        boundingBoxes: true,
        auth: false,

        images: [],
        visibleImagesIndexes: [],
        selectedImageIndex: null,
        galleryPage: 1,

        minConfidence: 0,
        model: null,
        dataset: null,
    })
    const value = { state, setState }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useAppContext() {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error(
            'useAppContext must be used within a AppContextProvider'
        )
    }
    return context
}

export { AppContextProvider, useAppContext }
