import React, {useContext, useState} from "react";
import getHttpInstance from "../utils/http_util";
import {storeUserLoginInfo} from "../service/UserService";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@material-ui/core";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import {AppContext} from "./Home";

const LoginPage = () => {
    const classes = useStyles();

    const [accessValue, setAccessValue] = useState();
    const [password, setPassword] = useState();
    const appContext = useContext(AppContext);
    const onSetAccessValue = (event) => {
        setAccessValue(event.target.value)
    }

    const onSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const doLogin = () => {
        let api_url = process.env.REACT_APP_BASE_API + "api/v1/user/login";
        getHttpInstance().post(api_url, {
            "email": accessValue,
            "password": password,
        })
            .then((response) => {
                console.log("response")
                console.log(response)
                let responseData = response.data;
                storeUserLoginInfo(responseData.data)
                appContext.Login(responseData.data.token)
            })
            .catch((error) => console.error(error))
            .finally(() => {
            });

    };

    return (
        <div className={classes.container}>
            <div className={classes.verticalBlock}/>
            <div className={classes.loginContainer}>
                <div className={classes.horizontalBlock}/>
                <div className={classes.loginBlock}>
                    <RssFeedIcon color="primary" className={classes.loginImage}/>
                    <TextField className={classes.inputFiled} required onChange={onSetAccessValue} variant="outlined"
                               label="邮箱或手机号" color="primary"/>
                    <TextField className={classes.inputFiled} required onChange={onSetPassword} variant="outlined" type="password"
                               label="密码" color="primary"/>
                    <Button onClick={doLogin} className={classes.loginButton} variant="contained"
                            color="primary">登录</Button>
                </div>
                <div className={classes.horizontalBlock}/>
            </div>
            <div className={classes.verticalBlock}/>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        height: '100%'
    },
    verticalBlock: {
        height: "20%",
    },
    horizontalBlock: {
        width: "10%",
        height: "20px",
        display: "inline-block",
    },
    loginContainer: {
        height: "60%",
    },
    loginBlock: {
        width: "80%",
        display: "inline-block",
    },
    loginImage: {
        width: "100%",
        fontSize: "60px",
        textAlign: "center"
    },
    inputFiled: {
        width: "100%",
        marginTop: "20px"
    },
    loginButton: {
        width: "100%",
        marginTop: "20px"
    }
});

export default LoginPage