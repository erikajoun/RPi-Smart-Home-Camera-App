import Pagination from '@material-ui/lab/Pagination'
import { useAppContext } from '../../contexts/AppContext'

export default function GalleryPagination({ imagesPerPage }) {
    const context = useAppContext()

    return (
        <Pagination
            count={
                parseInt(
                    context.state.visibleImagesIndexes.length / imagesPerPage
                ) +
                (context.state.visibleImagesIndexes.length % imagesPerPage === 0
                    ? 0
                    : 1)
            }
            onChange={(e, val) => {
                context.setState({ ...context.state, galleryPage: val })
            }}
            page={context.state.galleryPage}
        />
    )
}
