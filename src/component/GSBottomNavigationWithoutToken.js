import React, {useState, forwardRef, useEffect} from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import {BottomNavigationAction} from "@material-ui/core";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ListIcon from '@material-ui/icons/List';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

const GSBottomNavigationWithoutToken = forwardRef((props, ref) => {

    const classes = useStyles();
    const [bottomValue, setBottomValue] = useState()
    const onTabChange = (event, value) => {
        setBottomValue(value)
    }

    useEffect(() => {
        setBottomValue(0)
    }, [])

    return (
        <BottomNavigation
            ref={ref}
            value={bottomValue}
            onChange={onTabChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction icon={<RssFeedIcon/>} component={Link} to={'/'}/>
            <BottomNavigationAction icon={<SearchOutlinedIcon/>} component={Link} to={'/explore'}/>
            <BottomNavigationAction icon={<AccountCircleOutlinedIcon/>} component={Link} to={'/login'}/>
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

export default GSBottomNavigationWithoutToken