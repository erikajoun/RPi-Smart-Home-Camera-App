import React from 'react'
import Typography from '@material-ui/core/Typography'
import Gallery from './gallery/Gallery'
import GallerySearchbar from './gallery/GallerySearchbar'
import GallerySyncButton from './gallery/GallerySyncButton'
import GalleryPagination from './gallery/GalleryPagination'
import { Grid } from '@material-ui/core'
import { useStyles } from '../helpers/Styles'
import { theme } from '../helpers/Themes'
import { createUrl } from '../helpers/Utils'
import { useAppContext } from '../contexts/AppContext'

export default function Dashboard({ imagesPerPage }) {
    const classes = useStyles()
    const context = useAppContext()

    const [syncGallery, setSyncGallery] = React.useState(false)

    const fetchGallery = () => {
        setSyncGallery(true)
        fetch(
            createUrl(
                'get_gallery_images',
                context.state.ip,
                context.state.port
            )
        )
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                context.setState({
                    ...context.state,
                    images: res,
                    visibleImagesIndexes: [...Array(res.length).keys()],
                })
                setSyncGallery(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Typography variant="h6" className={classes.sectionTitle} noWrap>
                Object Detection Gallery
            </Typography>
            <Grid container justify="center">
                <div
                    style={{
                        marginBottom: theme.spacing(1),
                        width: '50%',
                        height: '30%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Grid container justify="center">
                            <div style={{ display: 'flex' }}>
                                <GallerySearchbar />
                                <GallerySyncButton
                                    syncGallery={syncGallery}
                                    fetchGallery={fetchGallery}
                                />
                            </div>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Gallery
                galleryPage={context.state.galleryPage}
                imagesPerPage={imagesPerPage}
            />
            <Grid container justify="center">
                <GalleryPagination imagesPerPage={imagesPerPage} />
            </Grid>
        </>
    )
}
