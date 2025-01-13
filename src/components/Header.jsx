import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, Outlet } from 'react-router-dom';

const pages = [
    { path: '/trendings', name: 'Trendings' },
    { path: '/movies', name: 'Movies' },
    { path: '/series', name: 'TV Series' },
];

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            MovieMania
                        </Typography>

                        {/* Mobile Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <NavLink
                                            to={page.path}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {page.name}
                                        </NavLink>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <NavLink
                                        to="/search"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        Search
                                    </NavLink>
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <NavLink
                                    key={page.name}
                                    to={page.path}
                                    style={({ isActive }) => ({
                                        textDecoration: 'none',
                                        color: isActive ? 'yellow' : 'white',
                                        margin: '0 15px',
                                    })}
                                >
                                    <Button sx={{ color: 'inherit' }}>{page.name}</Button>
                                </NavLink>
                            ))}
                        </Box>

                        {/* Search Icon */}
                        <Tooltip title="Search">
                            <IconButton href="/search" sx={{ p: 0, color: 'white' }}>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
};
