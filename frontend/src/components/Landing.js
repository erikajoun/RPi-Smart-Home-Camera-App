import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useStyles } from '../helpers/Styles'
import { useAppContext } from '../contexts/AppContext'

const useLandingStyles = makeStyles((theme) => ({
    buttonsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '25%',
        margin: 'auto 0',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
        },
    },
    button: {
        width: '25%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '25%',
            width: '50%',
        },
        fontSize: '18px',
    },
}))

export default function Landing() {
    const classes = useStyles()
    const landingClasses = useLandingStyles()
    const context = useAppContext()

    return (
        <div className={classes.sectionGroupContainer}>
            <div className={classes.sectionContainer}>
                <div className={landingClasses.buttonsContainer}>
                    <Button
                        className={landingClasses.button}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: 'authentication',
                            })
                        }}
                    >
                        Connect to my Raspberry Pi
                    </Button>
                    <Button
                        disabled
                        className={landingClasses.button}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: 'main',
                            })
                        }}
                    >
                        View the static site
                    </Button>
                </div>
            </div>
        </div>
    )
}
