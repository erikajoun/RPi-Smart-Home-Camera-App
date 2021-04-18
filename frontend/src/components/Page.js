import Main from './Main'
import AppHeader from './headers/AppHeader'
import Authentication from './ConnectPrompt'
import Landing from './Landing'
import { useAppContext } from '../contexts/AppContext'
import { useStyles } from '../helpers/Styles'

export default function Page() {
    const classes = useStyles()
    const context = useAppContext()

    return (
        <div className={classes.app}>
            <AppHeader />
            {context.state.page === 'landing' ? <Landing /> : null}
            {context.state.page === 'authentication' ? (
                <Authentication />
            ) : null}
            {context.state.page === 'main' ? <Main /> : null}
        </div>
    )
}
