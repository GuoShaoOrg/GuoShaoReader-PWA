import React from "react";
import { useParams } from "react-router-dom";
import FeedItemDetail from "../component/FeedItemDetail";

function SharedFeedItem() {

  const { itemId } = useParams()

  return (
    <div className="w-full">
      <FeedItemDetail itemId={itemId} showChannelInfo={true} />
    </div>
  )
}


export default SharedFeedItem;
