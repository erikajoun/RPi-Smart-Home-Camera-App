import SyncIcon from '@material-ui/icons/Sync'
import IconButton from '@material-ui/core/IconButton'

export default function GallerySyncButton({ syncGallery, fetchGallery }) {
    return !syncGallery ? (
        <IconButton onClick={fetchGallery}>
            <SyncIcon />
        </IconButton>
    ) : (
        <IconButton
            disabled
            style={{ animation: `spin 1s linear infinite` }}
            onClick={fetchGallery}
        >
            <SyncIcon />
        </IconButton>
    )
}
