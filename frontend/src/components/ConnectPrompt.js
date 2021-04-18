import React from 'react'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import { Button, Typography } from '@material-ui/core'
import { createUrl } from '../helpers/Utils'
import { useStyles } from '../helpers/Styles'
import { useAppContext } from '../contexts/AppContext'

export default function Authentication() {
    const [error, setError] = React.useState(false)

    const classes = useStyles()
    const context = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(createUrl('/', context.state.ip, context.state.port))
            .then((res) => {
                if (res.status === 200) {
                    context.setState({
                        ...context.state,
                        auth: true,
                        page: 'main',
                    })
                } else {
                    setError(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
    }

    return (
        <>
            <div className={classes.sectionGroupContainer}>
                <div className={classes.sectionContainer}>
                    <div style={{ alignSelf: 'flex-start' }}>
                        <IconButton
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    page: 'landing',
                                })
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </div>

                    <div className={classes.verticalCenterContainer}>
                        <Typography variant="h4" component="h2">
                            Enter information to connect with your Raspberry Pi
                            server:
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    margin: '50px 30% 50px 30%',
                                }}
                            >
                                {error ? (
                                    <Alert severity="error">
                                        {`Unable to connect to http://${context.state.ip}:${context.state.port}`}
                                    </Alert>
                                ) : null}

                                <TextField
                                    margin="dense"
                                    required
                                    id="ip"
                                    label="Device IP Address"
                                    type="text"
                                    onChange={(e) => {
                                        context.setState({
                                            ...context.state,
                                            ip: e.target.value,
                                        })
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="port"
                                    label="Port Number"
                                    type="text"
                                    onChange={(e) => {
                                        context.setState({
                                            ...context.state,
                                            port: e.target.value,
                                        })
                                    }}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Connect
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
