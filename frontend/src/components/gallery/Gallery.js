import React from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { useStyles } from '../../helpers/Styles'

export default function Gallery({ imagesPerPage }) {
    const context = useAppContext()
    const classes = useStyles()

    function handleThumbnailClick(e) {
        const visibleImgIndex =
            parseInt(e.target.id) +
            imagesPerPage * (context.state.galleryPage - 1)
        context.setState({
            ...context.state,
            selectedImageIndex: visibleImgIndex,
        })
    }

    const startIndex = 0 + imagesPerPage * (context.state.galleryPage - 1)
    const endIndex = startIndex + imagesPerPage

    const imagesList = context.state.visibleImagesIndexes
        .slice(startIndex, endIndex)
        .map((item, i) => {
            return (
                <div key={i} className={classes.galleryItem}>
                    <img
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        id={i}
                        src={
                            'data:image/jpg;base64, ' +
                            context.state.images[item].img_obj.labeled_img
                        }
                        onClick={handleThumbnailClick}
                        alt="live camera feed"
                    />
                </div>
            )
        })

    return (
        <>
            {context.state.selectedImageSrc ? null : null}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {imagesList}
            </div>
        </>
    )
}
