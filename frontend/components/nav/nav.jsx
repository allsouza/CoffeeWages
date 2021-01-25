import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions/user_actions';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { useDispatch } from 'react-redux';
import { toggleDarktheme } from '../../actions/theme_actions';
import styled from 'styled-components';


function Nav({currentUser, logout}) {
  const mobile = useMediaPredicate('(max-width: 768px)')
  const [anchor, setAnchor] = useState(null)
  const dispatch = useDispatch();
  const DarkmodeSwitch = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.75, 0.75) translate(0, 15%);
    width: ${mobile ? "100%" : "inherit"}
  `

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
            <DarkmodeSwitch onClick={() => dispatch(toggleDarktheme())}>
                <WbIncandescentIcon />
            </DarkmodeSwitch>
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
                <MenuItem onClick={closeMenu}><DarkmodeSwitch onClick={() => dispatch(toggleDarktheme())}>
                <WbIncandescentIcon />
                </DarkmodeSwitch></MenuItem>
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
