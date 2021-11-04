import React, {useContext, useState} from "react";
import getHttpInstance, {register, subFeedChannelById} from "../utils/http_util";
import {storeUserLoginInfo} from "../service/UserService";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@material-ui/core";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import {AuthContext} from "./Home";
import {useHistory} from "react-router-dom";
import Toast from "../component/Toast";

const RegisterPage = () => {
    const classes = useStyles();

    const history = useHistory()
    const [accessValue, setAccessValue] = useState();
    const [password, setPassword] = useState();
    const [verifyPassword, setVerifyPassword] = useState();
    const [nickname, setNickname] = useState();
    const authContext = useContext(AuthContext);
    const onSetAccessValue = (event) => {
        setAccessValue(event.target.value)
    }

    const onSetNicknameValue = (event) => {
        setNickname(event.target.value)
    }

    const onSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const onSetVerifyPassword = (event) => {
        setVerifyPassword(event.target.value)
    }

    const doRegister = () => {
        let params = getParams()
        if (params === undefined) {
            return
        }
        register(params).then(res => {
            if (res.status === 200) {
                storeUserLoginInfo(JSON.stringify(res.data.data))
                authContext.Login(res.data.data.token)
                history.push({
                    pathname: '/',
                })
            }
        }).catch(err => {
            console.log(err)
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
            "username": nickname,
            "email": accessValue,
            "password": password,
            "passwordVerify": verifyPassword,
        }

        if (isValidMobilePhone(accessValue)) {
            params = {
                "username": nickname,
                "mobile": accessValue,
                "password": password,
                "passwordVerify": verifyPassword,
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
                    <TextField className={classes.inputFiled} required onChange={onSetNicknameValue} variant="outlined"
                               label="昵称" color="primary"/>
                    <TextField className={classes.inputFiled} required onChange={onSetAccessValue} variant="outlined"
                               label="邮箱或手机号" color="primary"/>
                    <TextField className={classes.inputFiled} required onChange={onSetPassword} variant="outlined"
                               type="password"
                               label="密码" color="primary"/>
                    <TextField className={classes.inputFiled} required onChange={onSetVerifyPassword} variant="outlined"
                               type="password"
                               label="确认密码" color="primary"/>
                    <Button onClick={doRegister} className={classes.loginButton} variant="contained"
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

export default RegisterPage