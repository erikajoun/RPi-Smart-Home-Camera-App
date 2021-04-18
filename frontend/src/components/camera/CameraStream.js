import React from 'react'
import { Typography } from '@material-ui/core'
import { theme } from '../../helpers/Themes'
import { useStyles } from '../../helpers/Styles'
import { createUrl } from '../../helpers/Utils'
import { useAppContext } from '../../contexts/AppContext'
import TakePictureButton from './TakePictureButton'

export default function CameraStream() {
    const classes = useStyles()
    const context = useAppContext()

    return (
        <>
            <Typography variant="h6" className={classes.sectionTitle} noWrap>
                Live Camera Stream
            </Typography>
            <img
                style={{ width: '100%', height: 'auto', maxWidth: '640px' }}
                src={
                    context.state.auth
                        ? createUrl(
                              'camera_stream',
                              context.state.ip,
                              context.state.port
                          )
                        : 'video.jpg'
                }
                alt="live camera stream"
            />
            <div style={{ marginTop: theme.spacing(1) }}>
                <TakePictureButton />
            </div>
        </>
    )
}
