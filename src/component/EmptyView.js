import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import EmptyAnimation from "../assets/lotties/empty.json"
import Lottie from "lottie-react"


function EmptyView(props) {

  const emptyText = props.emptyText
  const [hintText, setHintText] = useState("")

  useEffect(() => {
    if (emptyText === undefined || emptyText === null || emptyText === "") {
      setHintText("还没有订阅源，赶快去添加吧")
    } else {
      setHintText(emptyText)
    }
  }, [])

  return (
    <div className="w-full max-h-96">
      <div className="flex justify-center mt-24">
        <Lottie animationData={EmptyAnimation} className="md:w-1/4 w-1/3" />
      </div>
      <div className="flex justify-center">
        <Typography variant="body1" gutterBottom>
          {hintText}
        </Typography>
      </div>
    </div>
  )
}


export default EmptyView;
