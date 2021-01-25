import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { fetchAllReviews } from '../../actions/review_actions';
import { useMediaPredicate } from 'react-media-hook';
import ShopSearch from './ShopSearch';
import { cardColor, textColor } from '../DarkThemeProvider';
import styled from 'styled-components';

const drawerWidth = 240;
const Sidebar = styled.div`
    background-color: ${cardColor};
    color: ${textColor};
    position: sticky;
    left: 0;
    top: 0;
    height: calc(100vh - 50px);
    overflow-y: scroll;
    width: 20vw;
    min-width: 20vw;
    border-radius: 0px 25px 25px 0px;
    padding-top: 25px;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const STATES = ['--','AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'D.C.'];


export default function ResponsiveDrawer({displayedReviews, setDisplayedReviews}) {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            margin: "auto",
            maxWidth: 500,
            marginBottom: 12,
            color: theme.palette.textColor
        },
        accordion: {
            backgroundColor: theme.palette.cardColor,
        },
        searchInputs: {
            marginBottom: 20,
            textAlign: 'center'
        },
        button: {
            height: 40,
            marginBottom: 12
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    const reviews = useSelector(( {entities} ) => Object.values(entities.reviews) );
    const locations = [...new Set(reviews.map( review => review.location ))];
    const shops = [...new Set(reviews.map(review => review.shopName))];
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const [checks, setChecks] = useState({});
    const [state, setState] = useState('');
    const displayedLocations = [...new Set(displayedReviews.map(review => review.location))];
    const displayedShops = [...new Set(displayedReviews.map(review => review.shopName))];
    const mobile = useMediaPredicate("(max-width:768px)");

    function handleSubmit(e) {
        e.preventDefault();
        const cityAndState = `${location},${state}`;
        dispatch(fetchAllReviews({ filters: { name, location:cityAndState } }));
    }
    
    function handleChange(field, e) {
        const node = e.currentTarget;
        const newReviews = [...displayedReviews];
        
        if (!node.checked) {
            for (let i = newReviews.length - 1; i >= 0; i--) {
                const review = newReviews[i];
                if (field === "location" ? review.location === node.id : review.shopName === node.id) {
                    newReviews.splice(i, 1);
                    setChecks({...checks, [node.id]: "unchecked" });
                }
            }
        } else {
            for (let i = reviews.length - 1; i >= 0; i--) {
                const review = reviews[i];
                if (field === "location" ? review.location === node.id : review.shopName === node.id) {
                    newReviews.push(review);
                    setChecks({...checks, [node.id]: "checked" });
                }
            }
        }
        setDisplayedReviews(newReviews);
    }

    function clearFilters() {
        setDisplayedReviews(reviews);
        const newState = {};
        Object.keys(checks).forEach(key => {
            newState[key] = "checked";
        });
        setChecks(Object.assign({}, checks, newState));
    }

    return (
        <Sidebar>
            <form onSubmit={handleSubmit} className='reviews-index-search-fields'>
                <TextField className={classes.searchInputs} value={name} onChange={e => setName(e.target.value)} label="Business name" />
                <TextField value={location} className={classes.searchInputs} onChange={e => setLocation(e.target.value)} label="Location" />
                <FormControl className={classes.searchInputs}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={state}
                        onChange={e => setState(e.target.value)}>
                        <MenuItem key='clear' value=''>Clear</MenuItem>
                        {STATES.map((state, idx) => {
                            return <MenuItem key={idx} value={state}>{state}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Button className={classes.button} type="submit" variant='contained' size="small" color="primary">Search</Button>
            </form>
            <Button variant='outlined' color='secondary' className={classes.button} onClick={clearFilters}>Clear Filters</Button>
            {locations.length > 0 ?
            <Accordion className={classes.accordion}>
                <AccordionSummary>Filter by Location</AccordionSummary>
                <AccordionDetails >
                    <List>
                        {locations.map((text) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <Switch id={text} 
                                        size="small" 
                                        disabled={checks[text] !== "unchecked" && !displayedLocations.includes(text)} 
                                        checked={checks[text] !== "unchecked"} 
                                        onChange={(e) => handleChange("location", e)} />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion> : <div></div>}
         
            {shops.length > 0 ?
            <Accordion className={classes.accordion}>
                <AccordionSummary>Filter by Shop</AccordionSummary>
                <AccordionDetails>
                    <List>
                        {shops.map((text) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <Switch id={text} 
                                        disabled={checks[text] !== "unchecked" && !displayedShops.includes(text)}
                                        size="small" 
                                        checked={checks[text] !== "unchecked"} 
                                        onChange={(e) => handleChange("name", e)} />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion> : <div></div> }
        </Sidebar>
        // <div className={classes.root}>
        //     <CssBaseline />
        //     <nav className={classes.drawer} aria-label="mailbox folders">
        //         <IconButton
        //             color="inherit"
        //             aria-label="open drawer"
        //             edge="start"
        //             onClick={handleDrawerToggle}
        //             className={classes.menuButton}
        //         >
        //             <MenuIcon />
        //         </IconButton>
                
        //         <Hidden smUp implementation="css">
        //             <Drawer
        //                 container={container}
        //                 variant="temporary"
        //                 anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        //                 open={mobileOpen}
        //                 onClose={handleDrawerToggle}
        //                 classes={{
        //                     paper: classes.drawerPaper,
        //                 }}
        //                 ModalProps={{
        //                     keepMounted: true
        //                 }}
        //             >
        //                 {drawer}
        //             </Drawer>
        //         </Hidden>
        //         <Hidden xsDown implementation="css">
        //             <Drawer
        //                 classes={{
        //                     paper: classes.drawerPaper,
        //                 }}
        //                 variant="permanent"
        //                 open
        //             >
        //                 {drawer}
        //             </Drawer>
        //         </Hidden>
        //     </nav>
        // </div>
    );
}