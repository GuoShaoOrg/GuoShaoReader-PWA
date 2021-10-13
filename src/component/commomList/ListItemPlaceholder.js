import React from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const ListItemPlaceholder = () => {

    return (
        <Card style={{width: '94%', marginLeft: '2%', marginRight: '2%', marginBottom: '8px'}}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                    }
                    title={
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                    }
                    subheader={
                        <Skeleton animation="wave" height={10} width="40%"/>
                    }
                />
                <CardContent>
                    <Skeleton style={{height: 190}} animation="wave" variant="rect"/>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </React.Fragment>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>

            </CardActions>
        </Card>
    )
}

export default ListItemPlaceholder;