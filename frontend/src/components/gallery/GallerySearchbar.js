import SearchBar from 'material-ui-search-bar'
import { useStyles } from '../../helpers/Styles'
import { useAppContext } from '../../contexts/AppContext'

export default function GallerySearchbar() {
    const context = useAppContext()
    const classes = useStyles()

    const cancelSearch = () => {
        search('')
    }

    function search(searchInput) {
        var arr = context.state.images

        var newArr = arr.reduce(function (acc, curr, index) {
            if (
                curr.img_obj.objects.some((label_obj) =>
                    label_obj['label'].startsWith(searchInput.toLowerCase())
                )
            ) {
                acc.push(index)
            }
            return acc
        }, [])

        context.setState({
            ...context.state,
            visibleImagesIndexes: newArr,
            galleryPage: 1,
        })
    }

    return (
        <SearchBar
            style={{
                borderRadius: '30px',
                backgroundColor: '#44444f',
            }}
            className={classes.searchbar}
            value={''}
            onChange={search}
            onCancelSearch={cancelSearch}
        />
    )
}
