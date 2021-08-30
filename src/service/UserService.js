export const storeUserLoginInfo = (userInfo) => {

    localStorage.setItem("userInfo", userInfo)
}

export const getUserLoginInfo = () => {
    return localStorage.getItem("userInfo")
}

export const getAuthToken = () => {
    let userLoginInfo = localStorage.getItem("userInfo")
    if (userLoginInfo === null || userLoginInfo === undefined) {
        return null
    }
    userLoginInfo = JSON.parse(userLoginInfo)
    return userLoginInfo["token"]
}

