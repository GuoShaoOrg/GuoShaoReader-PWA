import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import parse from "html-react-parser";

export default function FeedCatalogHorizontalItem(props) {
    const classes = useStyles();
    const itemData = props.data
    const date = itemData.InputDate.slice(0, 10)
    return (
        <Card className={classes.root}>
            <CardContent className={classes.media}>
                <Typography gutterBottom variant="subtitle2">{itemData.Title}</Typography>
                {parse(itemData.ChannelDesc)}
                <Typography className={classes.dateText} variant="subtitle2"
                            color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        width: 300,
        maxHeight: 500,
        marginLeft: '10px',
        marginBottom: '15px',
        marginTop: '5px',
        borderBottom: "none"
    },
    media: {
        maxWidth: 345,
    },
    dateText: {
        marginTop: "10px"
    }
});