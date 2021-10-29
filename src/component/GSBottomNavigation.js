import React, {useState, forwardRef, useEffect} from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import {BottomNavigationAction} from "@material-ui/core";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ListIcon from '@material-ui/icons/List';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {makeStyles} from "@material-ui/core/styles";
import {Link, useLocation} from 'react-router-dom';

const GSBottomNavigation = forwardRef((props, ref) => {

    const { pathname } = useLocation()
    const classes = useStyles();
    const [bottomValue, setBottomValue] = useState()
    const onTabChange = (event, value) => {
        setBottomValue(value)
    }

    useEffect(() => {
        switch (pathname) {
            case "/":
                setBottomValue(0)
                break
            case "/subList":
                setBottomValue(1)
                break
            case "/explore":
                setBottomValue(2)
                break
            case "/setting":
                setBottomValue(3)
                break
            default:
                break
        }
    }, [pathname])

    return (
        <BottomNavigation
            ref={ref}
            value={bottomValue}
            onChange={onTabChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction icon={<RssFeedIcon/>} component={Link} to={'/'}/>
            <BottomNavigationAction icon={<ListIcon/>} component={Link} to={'/subList'}/>
            <BottomNavigationAction icon={<SearchOutlinedIcon/>} component={Link} to={'/explore'}/>
            <BottomNavigationAction icon={<AccountCircleOutlinedIcon/>} component={Link} to={'/setting'}/>
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