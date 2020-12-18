import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';

export default function Nav() {
  const mobile = useMediaPredicate('(max-width: 768px)')
  const [anchor, setAnchor] = useState(null)

  function openMenu(event) {
    setAnchor(event.currentTarget)
  }

  function closeMenu() {
    setAnchor(null)
  }

  return (
    <header className= 'browsenav' >
        <nav>
            <Link to="/">
                <p className="navlinks">Home</p>
            </Link>
        </nav>
        {!mobile && <nav className="explore-links">
            <Link to="/reviews" className="navlinks">Explore Shops</Link>
            <Link to="/create_review" className="navlinks">Report Wages</Link>
            <Link to='/bug_report' className='navlinks'>Report a Bug</Link>
        </nav>}
        {mobile && <nav className="explore-links">
            <Button onClick={e => openMenu(e)}><i className="fas fa-bars"></i></Button>
            <Menu
              id='simple-menu'
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={closeMenu} >
                <MenuItem onClick={closeMenu}><Link to="/reviews" className="navlinks">Explore Shops</Link></MenuItem>
                <MenuItem onClick={closeMenu}><Link to="/create_review" className="navlinks">Report Wages</Link></MenuItem>
                <MenuItem onClick={closeMenu}><Link to='/bug_report' className='navlinks'>Report a Bug</Link></MenuItem>
            </Menu>
        </nav>
        }
    </header>
  );
}

