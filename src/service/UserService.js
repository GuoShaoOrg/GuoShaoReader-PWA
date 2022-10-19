export const storeUserLoginInfo = (userInfo) => {
  localStorage.setItem("userInfo", userInfo)
}

export const getUserLoginInfo = () => {
  let userLoginInfo = localStorage.getItem("userInfo")
  if (userLoginInfo === null || userLoginInfo === undefined || userLoginInfo === "null") {
    return null
  }
  return JSON.parse(userLoginInfo)
}

export const getAuthToken = () => {
  let userLoginInfo = localStorage.getItem("userInfo")
  if (userLoginInfo === null || userLoginInfo === undefined || userLoginInfo === "null" || userLoginInfo === "undefined") {
    return null
  }
  userLoginInfo = JSON.parse(userLoginInfo)
  return userLoginInfo["token"] + "@@" + userLoginInfo["uid"]
}

