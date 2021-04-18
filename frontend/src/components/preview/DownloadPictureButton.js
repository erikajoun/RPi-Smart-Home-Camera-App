import Button from '@material-ui/core/Button'

export default function DownloadPictureButton({ imageObj }) {
    return (
        <a
            href={'data:image/jpg;base64, ' + imageObj}
            download="myimage.jpg"
            style={{ textDecoration: 'none' }}
        >
            <Button variant="contained" color="primary">
                Download Photo
            </Button>
            <img
                style={{ display: 'none' }}
                src={'data:image/jpg;base64, ' + imageObj}
                alt="download"
            />
        </a>
    )
}
