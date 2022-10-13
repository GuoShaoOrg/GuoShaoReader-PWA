import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from 'prop-types';
import LoginView from "../component/LoginView";
import RegisterView from "../component/RegisterView";
import Lottie from "lottie-react"
import LoginAnimation from "../assets/lotties/login.json"

function TabPanel(props) {

  const index = props.index
  const value = props.value
  const children = props.children


  return (
    <div hidden={value !== index}>
      {children}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function LoginRegister() {

  const [tabValue, setTabValue] = React.useState(0)
  const handlerTabChange = (_event, newValue) => {
    console.log("newValue is :", newValue)
    setTabValue(newValue)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center md:-mt-32 sm:-mt-28 lg:-mt-48 -mt-32">
        <Lottie animationData={LoginAnimation} loop={true} className="md:w-1/2 w-4/5 max-w-md" />
      </div>
      <div className="w-full flex justify-center">
        <div className="md:w-1/2 w-4/5 max-w-md">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handlerTabChange} aria-label="login/register tabs">
              <Tab label="登录" className="w-1/2" />
              <Tab label="注册" className="w-1/2" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <LoginView />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <RegisterView />
          </TabPanel>
        </div>
      </div>
    </div>
  )
}


export default LoginRegister;
