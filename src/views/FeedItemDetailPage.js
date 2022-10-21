import React from "react";
import { useParams } from "react-router-dom";
import FeedItemDetail from "../component/FeedItemDetail";

function FeedItemDetailPage() {

  const { itemId } = useParams()

  return (
    <FeedItemDetail itemId={itemId} />
  )
}

export default FeedItemDetailPage;
