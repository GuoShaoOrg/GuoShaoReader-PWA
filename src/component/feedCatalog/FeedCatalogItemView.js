import React, {useEffect, useState} from "react";
import FeedCatalogHorizontalList from "./FeedCatalogHorizontalList";
import {
    Avatar,
    Card,
    CardActionArea,
    CardHeader,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {orange} from "@material-ui/core/colors";

export default function FeedCatalogItemView(props) {
    const classes = useStyles();
    const itemData = props.data
    const [subTitle, setSubTitle] = useState(itemData.ChannelDesc);
    const onFeedTitleClick = () => {

    }

    useEffect(() => {
        if (subTitle.length > 50) {
            setSubTitle(itemData.ChannelDesc.substring(0, 30) + "...")
        }
    }, [])

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="rss" className={classes.avatar} src={itemData.ImageUrl}/>
                    }
                    onClick={onFeedTitleClick}
                    title={itemData.Title}
                    subheader={subTitle}
                    className={classes.title}
                />
                {itemData.ItemList === null || itemData.ItemList.length === 0 ? null : (
                    <FeedCatalogHorizontalList data={itemData.ItemList}/>)
                }

            </CardActionArea>

        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '94%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '8px'
    },
    title: {},
    avatar: {
        backgroundColor: orange[500],
    },
}));