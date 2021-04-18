import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DownloadPictureButton from './DownloadPictureButton'
import { withStyles } from '@material-ui/core/styles'
import { useAppContext } from '../../contexts/AppContext'
import { theme } from '../../helpers/Themes'
import { useStyles } from '../../helpers/Styles'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    style={{
                        top: theme.spacing(2),
                        right: theme.spacing(2),
                        position: 'absolute',
                        color: '#9e9e9e',
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

export default function Preview({ imagesPerPage }) {
    const classes = useStyles()
    const context = useAppContext()

    const onClose = () => {
        context.setState({ ...context.state, selectedImageIndex: null })
    }

    const handleImageChange = (value) => {
        const imgIndex = context.state.selectedImageIndex + value
        const pageNum = ((imgIndex / imagesPerPage) | 0) + 1
        context.setState({
            ...context.state,
            selectedImageIndex: imgIndex,
            galleryPage: pageNum,
        })
    }

    const handleSwitch = () => {
        context.setState({
            ...context.state,
            boundingBoxes: !context.state.boundingBoxes,
        })
    }

    let imgData = null
    if (context.state.boundingBoxes) {
        imgData =
            context.state.images[
                context.state.visibleImagesIndexes[
                    context.state.selectedImageIndex
                ]
            ].img_obj.labeled_img
    } else {
        imgData =
            context.state.images[
                context.state.visibleImagesIndexes[
                    context.state.selectedImageIndex
                ]
            ].img_obj.img
    }

    return (
        <div>
            <Dialog
                open={true}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'md'}
            >
                <div className={classes.sectionGroupContainer}>
                    <div className={classes.sectionContainer}>
                        <DialogTitle
                            id="customized-dialog-title"
                            onClose={onClose}
                        >
                            Photo Preview
                        </DialogTitle>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={context.state.boundingBoxes}
                                    onChange={handleSwitch}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Include Bounding Boxes"
                        />

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {context.state.selectedImageIndex === 0 ? (
                                <IconButton
                                    disabled
                                    onClick={() => {
                                        handleImageChange(-1)
                                    }}
                                >
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        handleImageChange(-1)
                                    }}
                                >
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            )}

                            <DialogContent>
                                <img
                                    src={'data:image/jpg;base64, ' + imgData}
                                    alt="preview"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '640px',
                                    }}
                                />
                            </DialogContent>

                            {context.state.selectedImageIndex ===
                            context.state.visibleImagesIndexes.length - 1 ? (
                                <IconButton
                                    disabled
                                    onClick={() => {
                                        handleImageChange(1)
                                    }}
                                >
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        handleImageChange(1)
                                    }}
                                >
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            )}
                        </div>
                        <DownloadPictureButton imageObj={imgData} />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
