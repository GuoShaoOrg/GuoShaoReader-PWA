import React, {useContext} from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getUserLoginInfo} from "../service/UserService";
import {AccessTimeOutlined, EmailOutlined, ExitToAppOutlined, MobileFriendlyOutlined} from "@material-ui/icons";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import {AuthContext} from "./Home";
import {useHistory} from "react-router-dom";

const AccountPage = () => {
    const classes = useStyles();
    const userInfo = JSON.parse(getUserLoginInfo())
    const authContext = useContext(AuthContext);
    const history = useHistory()

    const logout = () => {
        authContext.LogOut()
        history.push({
            pathname: '/'
        })
    }

    return (
        <div>
            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <AccountCircleOutlinedIcon color="primary"/>
                </div>
                <Container className={classes.commonText}>{userInfo.username}</Container>
            </CardActionArea>
            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <EmailOutlined color="primary"/>
                </div>
                <Container className={classes.commonText}>{userInfo.email}</Container>
            </CardActionArea>
            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <MobileFriendlyOutlined color="primary"/>
                </div>
                <Container className={classes.commonText}>{userInfo.mobile}</Container>
            </CardActionArea>
            <CardActionArea className={classes.commonWrap}>
                <div className={classes.commonIcon}>
                    <AccessTimeOutlined color="primary"/>
                </div>
                <Container className={classes.commonText}>{userInfo.createDate}</Container>
            </CardActionArea>
            <CardActionArea className={classes.commonWrap} onClick={logout}>
                <div className={classes.commonIcon}>
                    <ExitToAppOutlined color="primary"/>
                </div>
                <Container className={classes.commonText}>退出登录</Container>
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
export default AccountPage;