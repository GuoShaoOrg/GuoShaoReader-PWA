import React from "react";
import AddFeedAnimation from "../assets/lotties/add-feed.json"
import { Button, TextField } from "@mui/material";
import Lottie from "lottie-react"
import { AppContext } from "../App";
import Toast from "../component/Toast";

function AddFeed() {

  const appContext = React.useContext(AppContext)
  const [feedInput, setFeedInput] = React.useState("")
  const handleFeedInputChange = (event) => {
    setFeedInput(event.target.value)
  }
  const submitBtnOnClick = () => {
    if (!appContext.IsLogin()) {
      Toast.show("请先登录", "error")
      return
    }
    console.log("the imput is : ", feedInput)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Lottie animationData={AddFeedAnimation} loop={true} className="md:w-1/2 w-4/5 max-w-md" />
      </div>
      <div className="flex justify-center h-12">
        <TextField className="md:w-1/2 w-4/5 max-w-xs" onChange={handleFeedInputChange} id="input-with-sx" label="订阅源" variant="standard" />
      </div>
      <div className="flex justify-center h-12 mt-12">
        <Button variant="contained" onClick={submitBtnOnClick} className="md:w-1/2 w-4/5 max-w-xs">添加订阅</Button>
      </div>
    </div>
  )
}


export default AddFeed;
