import React, {useState, forwardRef, useContext, useEffect} from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import {BottomNavigationAction} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import {AppContext} from "../pages/Home";

const GSBottomNavigation = forwardRef((props, ref) => {

    const classes = useStyles();
    const [bottomValue, setBottomValue] = useState()
    const appContext = useContext(AppContext);
    const onTabChange = (event, value) => {
        setBottomValue(value)
        switch (value) {
            case 0:
                appContext.SetTopBarTitle("TimeLine")
        }
    }

    useEffect(()=>{
        setBottomValue(0)
        appContext.SetTopBarTitle("TimeLine")
    },[])

    return (
        <BottomNavigation
            ref={ref}
            value={bottomValue}
            onChange={onTabChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon/>} component={Link} to={'/'}/>
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>} component={Link} to={'/item'}/>
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>} component={Link} to={'/404'}/>
        </BottomNavigation>
    )
})

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});

export default GSBottomNavigation