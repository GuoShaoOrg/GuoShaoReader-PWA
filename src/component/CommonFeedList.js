import React from "react";
import { List, ListItem } from "@mui/material"
import CommonFeedListItem from "./CommonFeedListItem";
import Pagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"
import ListLoadingPlaceholder from "./ListPlacHolder";


function CommonFeedList(props) {

  const fetchData = props.fetchData
  const [feedList, setFeedList] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1)

  const handlePaginationChange = (_event, value) => {
    console.log("page on changed : ", value)
    setPage(value)
  }


  return (
    <div className="w-full">
      <Box className="flex justify-center">
        {loading ? (<ListLoadingPlaceholder />) :
          <List sx={{ width: '100%', maxWidth: 720 }} className="w-full">
            {feedList.map((item, index) => (
              <ListItem key={index} disablePadding className="mt-4">
                <CommonFeedListItem />
              </ListItem>
            ))}
          </List>}
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination className="place-self-center" count={10} page={page} color="primary" onChange={handlePaginationChange} />
      </Box>
    </div>
  )
}


export default CommonFeedList;
