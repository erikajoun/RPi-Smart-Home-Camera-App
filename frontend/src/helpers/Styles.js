import { makeStyles } from '@material-ui/core/styles'
import { colors } from './Colors'

export const useStyles = makeStyles((theme) => ({
    app: {
        fontFamily: "'Roboto', 'Noto Sans', sans-serif",
        margin: '0px',
        padding: '10px',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    sectionGroupContainer: {
        backgroundColor: colors[2],
        borderRadius: '10px',
        padding: '5px',
        display: 'flex',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    sectionContainer: {
        backgroundColor: colors[1],
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    verticalCenterContainer: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerTitle: {
        '&:hover': { cursor: 'default' },
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionTitle: {
        '&:hover': { cursor: 'default' },
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    subSectionTitle: {
        '&:hover': { cursor: 'default' },
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    smallMargin: {
        marginTop: theme.spacing(2),
    },
    dialog: {
        position: 'absolute',
        left: '25%',
        top: '10%',
        '@media (max-width:680px)': {
            position: 'absolute',
            left: 0,
            margin: 'auto',
            width: '90%',
            height: '90%',
        },
    },
    modalContainer: {
        backgroundColor: colors[2],
        borderRadius: '10px',
        padding: '5px',
        textAlign: 'center',
    },
    galleryItem: {
        '&:hover': { cursor: 'pointer' },
        flex: '0 42%',
        marginBottom: '2%',
        marginLeft: '2%',
        [theme.breakpoints.up('sm')]: {
            flex: '0 30%',
        },
        [theme.breakpoints.up('lg')]: {
            flex: '0 20%',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    header: {
        marginBottom: '10px',
    },
}))
