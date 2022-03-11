import React, { useState, forwardRef, useContext, useEffect } from "react";
import { AuthContext } from "../pages/Home";
import { AppBar, Box, Drawer, IconButton, Toolbar, Avatar, Paper, List, ListItem, ListItemIcon, ListItemText, Container, Typography } from "@material-ui/core";
import { GradeOutlined, Menu } from "@material-ui/icons";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ListIcon from '@material-ui/icons/List';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

import { getUserLoginInfo } from "../service/UserService";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

const GSTopDrawer = forwardRef((props, ref) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const userInfo = JSON.parse(getUserLoginInfo())
    const history = useHistory()
    const [selectedIndex, setSelectedIndex] = React.useState("timeline");

    const authContext = useContext(AuthContext);

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const getUserName = () => {
        if (userInfo === null || userInfo === undefined || userInfo === "") {
            return "";
        } else {
            return userInfo["username"]
        }
    }

    const itemClickHandler = (pageName) => {
        setSelectedIndex(pageName);
        switch (pageName) {
            case "timeline":
                history.push({
                    pathname: '/timeline'
                })
                break;

            case "subList":
                history.push({
                    pathname: '/subList'
                })
                break;

            case "explore":
                history.push({
                    pathname: '/explore'
                })
                break;

            case "search":
                history.push({
                    pathname: '/search'
                })
                break;

            case "marked":
                history.push({
                    pathname: '/user/marked/item/'
                })
                break;

            case "setting":
                history.push({
                    pathname: '/setting'
                })
                break;

            case "account":
                history.push({
                    pathname: '/account/info'
                })
                break;

            case "login":
                history.push({
                    pathname: '/login'
                })
                break;
            default:
                break;
        }
    }

    return (
        <Box ref={ref} sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
                        <Menu />
                    </IconButton>
                    <Typography variant="subtitle2" className={classes.title}>{authContext.GetTopBarTitle()}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                <Box sx={{ width: authContext.GetCPageWidth() * 0.8 }} role="presentation" onClick={handleDrawerClose} onKeyDown={handleDrawerClose}>
                    {
                        authContext.IsLogin() ?
                            <Paper className={classes.account} onClick={() => itemClickHandler("account")}>
                                <div className={classes.avatar}>
                                    <Avatar alt="Remy Sharp" src="">GS</Avatar>
                                </div>
                                <div className={classes.username}>{getUserName()}</div>
                            </Paper>
                            :
                            <Paper className={classes.account} onClick={() => itemClickHandler("login")}>
                                <div className={classes.avatar}>
                                    <Avatar alt="Remy Sharp" src="">GS</Avatar>
                                </div>
                                <div className={classes.username}>登录/注册</div>
                            </Paper>}
                    <List>
                        <ListItem button onClick={() => itemClickHandler("timeline")} selected={selectedIndex === "timeline"}>
                            <ListItemIcon>
                                <RssFeedIcon color={selectedIndex === "timeline" ? "primary" : ""} />
                            </ListItemIcon>
                            <ListItemText primary="全部文章" />
                        </ListItem>

                        {authContext.IsLogin() ?
                            <ListItem button onClick={() => itemClickHandler("subList")} selected={selectedIndex === "subList"} >
                                <ListItemIcon>
                                    <ListIcon color={selectedIndex === "subList" ? "primary" : ""} />
                                </ListItemIcon>
                                <ListItemText primary="订阅列表" />
                            </ListItem> : null
                        }

                        <ListItem button onClick={() => itemClickHandler("explore")} selected={selectedIndex === "explore"}>
                            <ListItemIcon>
                                <ExploreOutlinedIcon color={selectedIndex === "explore" ? "primary" : ""}/>
                            </ListItemIcon>
                            <ListItemText primary="发现更多" />
                        </ListItem>

                        <ListItem button onClick={() => itemClickHandler("search")} selected={selectedIndex === "search"}>
                            <ListItemIcon>
                                <SearchOutlinedIcon color={selectedIndex === "search" ? "primary" : ""} />
                            </ListItemIcon>
                            <ListItemText primary="搜索文章" />
                        </ListItem>

                        {authContext.IsLogin() ?
                            <ListItem button onClick={() => itemClickHandler("marked")} selected={selectedIndex === "marked"} >
                                <ListItemIcon>
                                    <GradeOutlined color={selectedIndex === "marked" ? "primary" : ""}/>
                                </ListItemIcon>
                                <ListItemText primary="收藏文章" />
                            </ListItem> : null
                        }
                    </List>
                    {/* <Container>
                        <Typography variant="subtitle2" gutterBottom component="div">
                            订阅源
                        </Typography>
                    </Container> */}
                </Box>
            </Drawer>
        </Box>
    )

})

const useStyles = makeStyles((theme) => ({

    account: {
        marginTop: "5px",
        marginBottom: "25px"
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        marginLeft: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        display: "inline-block",
        textAlign: "center",
    },
    username: {
        display: "inline",
        textAlign: "center",
        marginLeft: "20px",
        fontSize: "1.1875rem",
    },
}));

export default GSTopDrawer;