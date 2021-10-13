import React from "react";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import FeedCatalogHorizontalItem from "./FeedCatalogHorizontalItem";

export default function FeedCatalogHorizontalList(props) {

    const listData = props.data

    return (
        <ScrollMenu >
            {
                listData.map(item => {
                    return <FeedCatalogHorizontalItem key={item.Id} data={item}/>
                })
            }
        </ScrollMenu>
    )
}