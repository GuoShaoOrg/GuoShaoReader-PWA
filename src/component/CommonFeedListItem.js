import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { diffTime } from '../utils/TimeUtils';
import { getTextFromDescription } from "../utils/Common";
import copy from 'copy-to-clipboard';
import Toast from "../component/Toast";
import { FavoriteBorderOutlined, ShareOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";



function CommonFeedListItem(props) {

  const navigate = useNavigate()
  const data = props.data
  const date = diffTime(data.InputDate, new Date())
  const [author, setAuthor] = React.useState("")
  const [isMarked, setIsMarked] = React.useState(false)

  useEffect(() => {
    if (data.Marked === 1) {
      setIsMarked(true)
    }
    if (data.Author !== "") {
      setAuthor("作者:" + data.Author)
    }
  }, [])

  const onFeedLinkClick = () => {
    navigate('/feed/item/' + data.Id)
  }

  const handlerShareClick = () => {
    let shareItemLink = process.env.REACT_APP_BASE_API + "s/f/" + data.Id;
    let shareText = data.Title + "\n" + shareItemLink
    copy(shareText)
    Toast.show("链接已复制到剪贴板", "info")
  }

  return (
    <Card sx={{ maxWidth: 690, width: '100%', marginLeft: "20px", marginRight: "20px" }}>
      <CardHeader
        avatar={
          <img className="object-contain rounded-full border w-12 h-12 max-w-min" alt="Remy Sharp" src={data.ChannelImageUrl} />
        }
        title={data.Title}
        subheader={data.ChannelTitle}
      />
      <CardContent onClick={onFeedLinkClick}>
        <meta name="referrer" content="no-referrer" />
        {data.Thumbnail === ''
          ?
          <Typography className="mt-3" variant="subtitle1"
            color="textSecondary">{getTextFromDescription(data.Description)}</Typography>
          :
          <CardMedia
            className="max-h-80 overflow-scroll"
            component="img"
            image={data.Thumbnail}
            alt=""
          />}
        <Typography variant="subtitle2" color="textSecondary">{date}&nbsp;&nbsp;{author}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {isMarked ? <FavoriteBorderOutlined color={"primary"} /> : (
            <FavoriteBorderOutlined />
          )}
        </IconButton>
        <IconButton aria-label="share" onClick={handlerShareClick}>
          <ShareOutlined />
        </IconButton>
      </CardActions>
    </Card>
  )
}


export default CommonFeedListItem;
