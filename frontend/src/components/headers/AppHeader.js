import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import GitHubIcon from '@material-ui/icons/GitHub'
import SettingsIcon from '@material-ui/icons/Settings'
import { useAppContext } from '../../contexts/AppContext'
import { useStyles } from '../../helpers/Styles'

export default function AppHeader() {
    const context = useAppContext()
    const classes = useStyles()

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    function handleSettingsClick() {
        setMobileMoreAnchorEl(null)
        context.setState({
            ...context.state,
            settingsOpen: true,
        })
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const mobileMenuId = 'primary-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <GitHubIcon />
                </IconButton>
                <p>Github</p>
            </MenuItem>
            {context.state.page === 'main' ? (
                <MenuItem onClick={handleSettingsClick}>
                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    <p>Settings</p>
                </MenuItem>
            ) : null}
        </Menu>
    )

    return (
        <div className={classes.header}>
            <AppBar position="static" className="header">
                <Toolbar className={classes.toolbar}>
                    <Typography
                        className={classes.headerTitle}
                        variant="h6"
                        noWrap
                    >
                        Home Smart Camera Viewer
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit">
                            <GitHubIcon />
                        </IconButton>
                        {context.state.page === 'main' ? (
                            <IconButton
                                color="inherit"
                                onClick={handleSettingsClick}
                            >
                                <SettingsIcon />
                            </IconButton>
                        ) : null}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    )
}
