import React, {useContext, useEffect} from "react";
import {AppBar, Avatar, Paper, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const Setting = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>设置</Typography>
                </Toolbar>
            </AppBar>
            <Paper className={classes.account}>
                <div className={classes.avatar}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">GS</Avatar>
                </div>
                <div className={classes.username}>username</div>
            </Paper>
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
        marginTop: "5px"
    },
    avatar: {
        marginLeft: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        display: "inline-block",
        textAlign: "center"
    },
    username: {
        display: "inline",
        textAlign: "center",
        marginLeft: "20px"
    }
}));
export default Setting