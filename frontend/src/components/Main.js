import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import CameraStream from './camera/CameraStream'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Preview from './preview/Preview'
import { useStyles } from '../helpers/Styles'
import { useAppContext } from '../contexts/AppContext'
import { createUrl } from '../helpers/Utils'

export default function Main() {
    const classes = useStyles()
    const context = useAppContext()

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'))

    let imagesPerPage = 12
    if (isSmallScreen) {
        imagesPerPage = 9
    }

    React.useEffect(() => {
        const populateState = () => {
            let settings
            fetch(
                createUrl('get_settings', context.state.ip, context.state.port)
            )
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    settings = res
                    return fetch(
                        createUrl(
                            'get_gallery_images',
                            context.state.ip,
                            context.state.port
                        ),
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                        .then((res) => {
                            return res.json()
                        })
                        .then((res) => {
                            context.setState({
                                ...context.state,
                                images: res,
                                visibleImagesIndexes: [
                                    ...Array(res.length).keys(),
                                ],
                                minConfidence: settings.minConfidence,
                                model: settings.model,
                                dataset: settings.dataset,
                                page: 'main',
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        populateState()
    }, [])

    return (
        <div className={classes.sectionGroupContainer}>
            <div className={classes.sectionContainer}>
                <CameraStream />
            </div>
            <div className={classes.sectionContainer}>
                <Dashboard imagesPerPage={imagesPerPage} />
            </div>
            {context.state.selectedImageIndex !== null ? (
                <Preview imagesPerPage={imagesPerPage} />
            ) : null}
            {context.state.settingsOpen ? <Settings /> : null}
        </div>
    )
}
