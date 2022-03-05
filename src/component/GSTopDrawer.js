import React, { useState, forwardRef, useContext, useEffect } from "react";
import { AuthContext } from "../pages/Home";
import { AppBar, Box, Drawer, IconButton, Toolbar, Avatar, Paper, List, ListItem, ListItemIcon, ListItemText, Container, Typography } from "@material-ui/core";
import { GradeOutlined, ViewListOutlined, Menu } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { getUserLoginInfo } from "../service/UserService";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

const GSTopDrawer = forwardRef((props, ref) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const userInfo = JSON.parse(getUserLoginInfo())
    const history = useHistory()

    const authContext = useContext(AuthContext);

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const itemClickHandler = (pageName) => {
        console.log("pageName:", pageName);
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

            case "marked":
                history.push({
                    pathname: '/user/marked/item/'
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (authContext.IsLogin()) {
            console.log("authContext.IsLogin():", authContext.IsLogin());
        }
    }, [authContext.IsLogin()])

    return (
        <Box ref={ref} sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                <Box sx={{ width: authContext.GetCPageWidth()*0.8 }} role="presentation" onClick={handleDrawerClose} onKeyDown={handleDrawerClose}>
                    <Paper className={classes.account} onClick={() => itemClickHandler("account")}>
                        <div className={classes.avatar}>
                            <Avatar alt="Remy Sharp" src="">GS</Avatar>
                        </div>
                        <div className={classes.username}>{userInfo["username"]}</div>
                    </Paper>
                    <List>
                        <ListItem button onClick={() => itemClickHandler("timeline")}>
                            <ListItemIcon>
                                <ViewListOutlined />
                            </ListItemIcon>
                            <ListItemText primary="全部文章" />
                        </ListItem>

                        <ListItem button onClick={() => itemClickHandler("subList")}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="订阅列表" />
                        </ListItem>

                        <ListItem button onClick={() => itemClickHandler("explore")}>
                            <ListItemIcon>
                                <SearchOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="发现更多" />
                        </ListItem>

                        <ListItem button onClick={() => itemClickHandler("marked")}>
                            <ListItemIcon>
                                <GradeOutlined />
                            </ListItemIcon>
                            <ListItemText primary="收藏文章" />
                        </ListItem>
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