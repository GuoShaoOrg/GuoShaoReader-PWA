import React from "react";
import AddFeedAnimation from "../assets/lotties/add-feed.json"
import { Button, TextField } from "@mui/material";
import Lottie from "lottie-react"

function AddFeed() {

  const [feedInput, setFeedInput] = React.useState("")
  const handleFeedInputChange = (event) => {
    setFeedInput(event.target.value)
  }
  const submitBtnOnClick = () => {
    console.log("the imput is : ", feedInput)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Lottie animationData={AddFeedAnimation} loop={true} className="md:w-1/2" />
      </div>
      <div className="flex justify-center h-12">
        <TextField className="w-1/2" onChange={handleFeedInputChange} id="input-with-sx" label="订阅源" variant="standard" />
      </div>
      <div className="flex justify-center h-12 mt-12">
        <Button variant="contained" onClick={submitBtnOnClick} className="w-36">添加订阅</Button>
      </div>
    </div>
  )
}


export default AddFeed;
