import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/user_actions';

function Nav({currentUser, logout}) {
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
            <Link to='/feedback' className='navlinks'>Feedback</Link>
            {Boolean(currentUser) ? <div className='user-info'>
              <p>Hello {currentUser.firstName} {currentUser.admin ? <i className="fas fa-user-shield"></i> : null}, <a className='navlinks' onClick={logout}>Logout</a></p>
            </div> : null}
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
                <MenuItem onClick={closeMenu}><Link to='/feedback' className='navlinks'>Feedback</Link></MenuItem>
            </Menu>
        </nav>
        }
    </header>
  );
}

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id]
})

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Nav)
