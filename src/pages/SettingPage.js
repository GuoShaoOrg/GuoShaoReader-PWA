import React from "react";
import {AppBar, Avatar, Container, Paper, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getUserLoginInfo} from "../service/UserService";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CardActionArea from '@material-ui/core/CardActionArea';
import {useHistory} from "react-router-dom";


const SettingPage = () => {
    const classes = useStyles();
    const userInfo = JSON.parse(getUserLoginInfo())
    const history = useHistory()

    const toMarkedItemListPage = () => {
        history.push({
            pathname: '/user/marked/item/'
        })
    }
    const toAccountInfoPage = () => {
        history.push({
            pathname: '/account/info'
        })
    }

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>设置</Typography>
                </Toolbar>
            </AppBar>
            <Paper className={classes.account} onClick={toAccountInfoPage}>
                <div className={classes.avatar}>
                    <Avatar alt="Remy Sharp" src="">GS</Avatar>
                </div>
                <div className={classes.username}>{userInfo["username"]}</div>
            </Paper>

            <CardActionArea className={classes.commonWrap} onClick={toMarkedItemListPage}>
                <div className={classes.commonIcon} >
                    <FavoriteBorderOutlinedIcon color="primary"/>
                </div>
                <Container className={classes.commonText}>收藏记录</Container>
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