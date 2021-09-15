import React from "react";
import {AppBar, Avatar, Container, Paper, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getUserLoginInfo} from "../service/UserService";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CardActionArea from '@material-ui/core/CardActionArea';


const SettingPage = () => {
    const classes = useStyles();
    const userInfo = JSON.parse(getUserLoginInfo())

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>设置</Typography>
                </Toolbar>
            </AppBar>
            <Paper className={classes.account}>
                <div className={classes.avatar}>
                    <Avatar alt="Remy Sharp" src="">GS</Avatar>
                </div>
                <div className={classes.username}>{userInfo["username"]}</div>
            </Paper>

            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <PlaylistAddCheckIcon color="primary"/>
                </div>
                <Container className={classes.commonText}>订阅历史</Container>
            </CardActionArea>
            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <FavoriteBorderOutlinedIcon color="primary"/>
                </div>
                <Container className={classes.commonText}>喜欢记录</Container>
            </CardActionArea>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "gray"
    },
    title: {
        flexGrow: 1,
    },
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
    commonWrap: {
        marginTop: "5px",
        boxShadow: "0px 2px 2px -1px grey",
        borderRadius: "4px"
    },
    commonIcon: {
        marginLeft: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        display: "inline-block",
    },
    commonText: {
        display: "inline-block",
        width: "200px",
        verticalAlign: "top",
        marginTop: "10px",
        marginBottom: "10px",
    },
}));
export default SettingPage