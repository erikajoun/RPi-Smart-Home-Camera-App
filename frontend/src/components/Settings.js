import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormLabel from '@material-ui/core/FormLabel'
import { Slider } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { useAppContext } from '../contexts/AppContext'
import { theme } from '../helpers/Themes'
import { useStyles } from '../helpers/Styles'
import { createUrl } from '../helpers/Utils'

export default function Settings() {
    const classes = useStyles()
    const context = useAppContext()

    const handleCancel = () => {
        fetch(createUrl('get_settings', context.state.ip, context.state.port))
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                context.setState({
                    ...context.state,
                    minConfidence: res.minConfidence,
                    model: res.model,
                    dataset: res.dataset,
                    settingsOpen: false,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSave = () => {
        fetch(
            createUrl('update_settings', context.state.ip, context.state.port),
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    minConfidence: context.state.minConfidence,
                    model: context.state.model,
                    dataset: context.state.dataset,
                }),
            }
        )
            .then(() => {
                context.setState({
                    ...context.state,
                    settingsOpen: false,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const marks = [
        {
            value: 1,
            label: '1%',
        },
        {
            value: 100,
            label: '100%',
        },
    ]

    return (
        <>
            <Dialog
                open={true}
                aria-labelledby="responsive-dialog-title"
                disableBackdropClick
            >
                <div className={classes.modalContainer}>
                    <div className={classes.sectionContainer}>
                        <Typography
                            variant="h6"
                            className={classes.sectionTitle}
                            noWrap
                        >
                            Object Detection Settings
                        </Typography>
                        <DialogContent>
                            <div style={{ marginTop: theme.spacing(4) }}>
                                <FormLabel
                                    className={classes.subSectionTitle}
                                    component="legend"
                                >
                                    Pre-Trained Model
                                </FormLabel>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <FormControl>
                                        <InputLabel htmlFor="uncontrolled-native">
                                            Model
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={0}
                                        >
                                            <MenuItem value={0}>
                                                SSDLite Mobilenet v2
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div
                                        style={{ marginLeft: theme.spacing(4) }}
                                    >
                                        <FormControl>
                                            <InputLabel htmlFor="uncontrolled-native">
                                                Dataset
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={0}
                                            >
                                                <MenuItem value={0}>
                                                    MS COCO
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: theme.spacing(6),
                                    marginBottom: theme.spacing(2),
                                }}
                            >
                                <div style={{ marginBottom: theme.spacing(5) }}>
                                    <FormLabel
                                        className={classes.subSectionTitle}
                                        component="legend"
                                    >
                                        Minimum Confidence Threshold
                                    </FormLabel>
                                </div>

                                <Slider
                                    defaultValue={context.state.minConfidence}
                                    getAriaValueText={(value) => `${value}°C`}
                                    aria-labelledby="discrete-slider-always"
                                    step={1}
                                    marks={marks}
                                    valueLabelDisplay="on"
                                    onChange={(e, val) => {
                                        context.setState({
                                            ...context.state,
                                            minConfidence: val,
                                        })
                                    }}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions className="dialogActions">
                            <div
                                style={{
                                    margin: 'auto',
                                }}
                            >
                                <Button
                                    autoFocus
                                    variant="text"
                                    onClick={handleCancel}
                                    color="inherit"
                                    style={{ marginRight: theme.spacing(1) }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    color="primary"
                                    autoFocus
                                >
                                    Save
                                </Button>
                            </div>
                        </DialogActions>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
