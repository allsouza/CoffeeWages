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
import { Button, TextField } from '@material-ui/core';
import { fetchAllReviews } from '../../actions/review_actions';

const drawerWidth = 240;

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: "auto",
        maxWidth: 500,
        marginBottom: 12,
    },
    searchInputs: {
        marginBottom: 20,
        textAlign: 'center'
    },
    searchButton: {
        height: 40,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ResponsiveDrawer({displayedReviews, setDisplayedReviews}) {
    const classes = useStyles();
    const reviews = useSelector(( {entities} ) => Object.values(entities.reviews) );
    const locations = [...new Set(reviews.map( review => review.location ))];
    const shops = [...new Set(reviews.map(review => review.shopName))];
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const [checks, setChecks] = useState({});
    const displayedLocations = [...new Set(displayedReviews.map(review => review.location))];
    const displayedShops = [...new Set(displayedReviews.map(review => review.shopName))];

    function handleSubmit(e) {
        e.preventDefault();
        if (name || location) {
            dispatch(fetchAllReviews({ filters: { name, location } }));
        }
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
        <div className="reviews-index-sidebar">
            <form onSubmit={handleSubmit} className='reviews-index-search-fields'>
                <TextField className={classes.searchInputs} value={name} onChange={e => setName(e.target.value)} label="Business name" />
                <TextField value={location} className={classes.searchInputs} onChange={e => setLocation(e.target.value)} label="Location" />
                <Button className={classes.searchButton} type="submit" variant='contained' size="small" color="primary">Search</Button>
            </form>
            <a onClick={clearFilters}>Clear Filters</a>
            {locations.length > 0 ?
            <Accordion defaultExpanded>
                <AccordionSummary>Filter by Location</AccordionSummary>
                <AccordionDetails>
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
            <Accordion defaultExpanded>
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
        </div>
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