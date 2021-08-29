import React from "react";
import getHttpInstance from "../utils/http_util";
import {storeUserLoginInfo} from "../service/UserService";
import {Container} from "@material-ui/core";

const LoginPage = () => {

    // const doLogin = () => {
    //     let api_url = process.env.REACT_APP_BASE_API + "api/v1/user/login";
    //     getHttpInstance().post(api_url, {
    //         "email": accessValue,
    //         "password": password,
    //     })
    //         .then((response) => {
    //             let responseData = response.data;
    //             storeUserLoginInfo(responseData)
    //         })
    //         .catch((error) => console.error(error))
    //         .finally(() => {
    //         });
    //
    // };

    return(
        <Container>

        </Container>
    )
}