import React from "react";
import { Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import { login } from "../utils/http_util";
import { isValidateEmail, isValidMobilePhone } from "../utils/common";
import Toast from "../component/Toast";
import { storeUserLoginInfo } from "../service/UserService";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {

  const appContext = React.useContext(AppContext)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()

  const handleUserNameInputChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value)
  }

  const loginBtnOnClick = () => {
    let param = getInputParam()
    login(param).then((resp) => {
      storeUserLoginInfo(resp)
      appContext.Login(resp.token)
      navigate("/")
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getInputParam = () => {
    if (!isValidateEmail(username) && !isValidMobilePhone(username)) {
      Toast.show("请输入正确格式的手机号或邮箱", "error")
      return
    }
    let params = {
      "email": username,
      "password": password,
    }

    if (isValidMobilePhone(username)) {
      params = {
        "mobile": username,
        "password": password,
      }
    }

    return params
  }

  return (
    <div className="w-full">
      <div className="flex justify-center h-12">
        <TextField className="w-1/2" onChange={handleUserNameInputChange} id="input-with-sx" label="用户名" variant="standard" />
      </div>
      <div className="flex justify-center h-12 mt-8">
        <FormControl className="w-1/2" variant="standard">
          <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
          <Input type={showPassword ? 'text' : 'password'}
            variant="standard"
            onChange={handlePasswordInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="密码" />
        </FormControl>
      </div>
      <div className="flex justify-center h-12 mt-12">
        <Button variant="contained" onClick={loginBtnOnClick} className="md:w-1/4 w-1/2">登录</Button>
      </div>
      <div className="flex justify-center h-12 mt-12">
        <Button variant="contained" onClick={loginBtnOnClick} className="md:w-1/4 w-1/2">注册</Button>
      </div>
    </div>
  )
}


export default Login;
