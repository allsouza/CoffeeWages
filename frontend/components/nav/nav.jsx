import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
            <NavLink exact to="/" activeClassName='selected' className="navlinks">Home</NavLink>
        </nav>
        {!mobile && <nav className="explore-links">
            <NavLink activeClassName='selected' to="/reviews" className="navlinks">Explore Shops</NavLink>
            <NavLink activeClassName='selected' to="/create_review" className="navlinks">Report Wages</NavLink>
            <NavLink activeClassName='selected' to='/feedback' className='navlinks'>Feedback</NavLink>
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
                <MenuItem onClick={closeMenu}><NavLink activeClassName='selected' to="/reviews" className="navlinks">Explore Shops</NavLink></MenuItem>
                <MenuItem onClick={closeMenu}><NavLink activeClassName='selected' to="/create_review" className="navlinks">Report Wages</NavLink></MenuItem>
                <MenuItem onClick={closeMenu}><NavLink activeClassName='selected' to='/feedback' className='navlinks'>Feedback</NavLink></MenuItem>
                {Boolean(currentUser) ? <MenuItem onClick={() => {
                  closeMenu()
                  logout()
                }}><span className='navlinks'>Logout {currentUser.firstName} {currentUser.admin ? <i className="fas fa-user-shield"></i> : null}</span> </MenuItem> : null}
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
