import download from 'downloadjs'
import { Button } from '@material-ui/core'
import { createUrl } from '../../helpers/Utils'
import { useAppContext } from '../../contexts/AppContext'

export default function TakePictureButton() {
    const context = useAppContext()

    const handleClick = () => {
        fetch(createUrl('get_picture', context.state.ip, context.state.port))
            .then((res) => {
                return res.blob()
            })
            .then((blob) => {
                download(blob, 'image.jpg')
            })
            .catch((err) => console.log(err))
    }

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>
            Take Photo
        </Button>
    )
}
