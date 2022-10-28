import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { getUserLoginInfo } from "../service/UserService";

function AccountPage() {

  const userInfo = getUserLoginInfo()
  const appContext = useContext(AppContext)
  const navigate = useNavigate()

  const logout = () => {
    appContext.LogOut()
    navigate("/")
  }

  return (
    <div className="w-full flex justify-center mt-10 mx-5">
      <div className="max-w-3xl w-4/5 py-10 rounded-lg border border-solid ">
        <div className="mx-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mx-4 mb-4">账户信息</h3>
        </div>
        <div className="bg-gray-50 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 mx-4">昵称</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 mx-4">{userInfo.username}</dd>
        </div>
        <div className="bg-white py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 mx-4">手机号</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 mx-4">{userInfo.mobile}</dd>
        </div>
        <div className="bg-gray-50 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 mx-4">注册时间</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 mx-4">{userInfo.updateDate}</dd>
        </div>
        <div className="bg-white py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 mx-4">登出账号</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 mx-4">
            <Button variant="contained" className="w-1/3" onClick={logout} >登出</Button>
          </dd>
        </div>
      </div>

    </div>
  )
}

export default AccountPage;
