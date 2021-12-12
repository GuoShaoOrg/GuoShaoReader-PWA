import React, {useContext, useState} from "react";
import getHttpInstance from "../utils/http_util";
import {storeUserLoginInfo} from "../service/UserService";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@material-ui/core";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import {AuthContext} from "./Home";
import {useHistory} from "react-router-dom";
import Toast from "../component/Toast";

const LoginPage = () => {
    const classes = useStyles();

    const history = useHistory()
    const [accessValue, setAccessValue] = useState();
    const [password, setPassword] = useState();
    const authContext = useContext(AuthContext);
    const onSetAccessValue = (event) => {
        setAccessValue(event.target.value)
    }

    const onSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const doLogin = () => {
        let api_url = process.env.REACT_APP_BASE_API + "rss/api/v1/user/login";
        let params = getParams()
        getHttpInstance().post(api_url, params)
            .then((response) => {
                let responseData = response.data;
                storeUserLoginInfo(JSON.stringify(responseData.data))
                authContext.Login(responseData.data.token)
                history.push({
                    pathname: '/',
                })
            })
            .catch((error) => console.error(error))
            .finally(() => {
            });

    };

    const toRegisterPage = () => {
        history.push({
            pathname: '/register',
        })
    };

    const isValidMobilePhone = (phone) => {
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
    }

    const isValidateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const getParams = () => {
        if (!isValidateEmail(accessValue) && !isValidMobilePhone(accessValue)) {
            Toast.show("请输入正确格式的手机号或邮箱", "error")
            return
        }
        let params = {
            "email": accessValue,
            "password": password,
        }

        if (isValidMobilePhone(accessValue)) {
            params = {
                "mobile": accessValue,
                "password": password,
            }
        }

        return params
    }

    return (
        <div className={classes.container}>
            <div className={classes.verticalBlock}/>
            <div className={classes.loginContainer}>
                <div className={classes.horizontalBlock}/>
                <div className={classes.loginBlock}>
                    <RssFeedIcon color="primary" className={classes.loginImage}/>
                    <TextField className={classes.inputFiled} required onChange={onSetAccessValue} variant="outlined"
                               label="邮箱或手机号" color="primary"/>
                    <TextField className={classes.inputFiled} required onChange={onSetPassword} variant="outlined"
                               type="password"
                               label="密码" color="primary"/>
                    <Button onClick={doLogin} className={classes.loginButton} variant="contained"
                            color="primary">登录</Button>
                    <Button onClick={toRegisterPage} className={classes.loginButton} variant="contained"
                            color="primary">注册</Button>
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