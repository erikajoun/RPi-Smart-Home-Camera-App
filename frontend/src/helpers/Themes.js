import { createMuiTheme } from '@material-ui/core/styles'
import { colors } from './Colors'

export const theme = createMuiTheme({
    typography: {
        allVariants: {
            color: 'white',
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: colors[0],
        },
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: colors[2],
            },
        },
        MuiButton: {
            root: {
                borderRadius: '20px',
            },
        },
        MuiPaper: {
            rounded: {
                borderRadius: '10px',
            },
        },
        MuiSlider: {
            valueLabel: {
                color: colors[0],
            },
        },
    },
})
