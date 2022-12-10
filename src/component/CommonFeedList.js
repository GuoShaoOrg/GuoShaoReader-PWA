import React, { useEffect, useImperativeHandle } from "react";
import { List, ListItem } from "@mui/material"
import CommonFeedListItem from "./CommonFeedListItem";
import Pagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"
import ListLoadingPlaceholder from "./ListPlacHolder";
import EmptyView from "./EmptyView";


const CommonFeedList = React.forwardRef((props, ref) => {

  const fetchData = props.fetchData
  const emptyText = props.emptyText
  const [feedList, setFeedList] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState(0)
  const [subFeedListEmpty, setSubFeedListEmpty] = React.useState(true)

  const handlePaginationChange = (_event, value) => {
    setPage(value)
    setLoading(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    fetchData(false, value, (resp) => {
      if (resp === undefined || resp === null || resp === []) {
        if (feedList.length === 0) {
          setSubFeedListEmpty(true)
        }
        setLoading(false)
        return
      }
      setLoading(false)
      setFeedList(resp)
    })
  }

  useImperativeHandle(ref, () => ({
    refreshListData() {
      setLoading(true)
      setPage(1)
      fetchData(true, 1, (resp) => {
        if (resp === undefined || resp === null || resp.length === 0) {
          if (feedList.length === 0) {
            setSubFeedListEmpty(true)
          }
          setLoading(false)
          setSubFeedListEmpty(true)
          return
        }
        setSubFeedListEmpty(false)
        setFeedList(resp)
        let roundCount = Math.floor(resp[0].Count / resp.length)
        setCount(roundCount)
      })
      setLoading(false)
    },
  }))

  useEffect(() => {
    setLoading(true)
    fetchData(true, page, (resp) => {
      if (resp === undefined || resp === null || resp.length === 0) {
        if (feedList.length === 0) {
          setSubFeedListEmpty(true)
        }
        setLoading(false)
        setSubFeedListEmpty(true)
        return
      }
      setSubFeedListEmpty(false)
      setFeedList(resp)
      let roundCount = Math.floor(resp[0].Count / resp.length)
      setCount(roundCount)
    })
    setLoading(false)
  }, [])



  return (
    <div className="w-full">
      {subFeedListEmpty ? (<EmptyView emptyText={emptyText} />) :
        <div>
          <Box className="flex justify-center">
            {loading ? (<ListLoadingPlaceholder />) :
              <List sx={{ width: '100%', maxWidth: 720 }} className="w-full">
                {feedList.map((item, index) => (
                  <ListItem key={index} disablePadding className="mt-4">
                    <CommonFeedListItem data={item} />
                  </ListItem>
                ))}
              </List>}
          </Box>
          <Box display="flex" justifyContent="center">
            <Pagination className="place-self-center mb-5" count={count} page={page} color="primary" onChange={handlePaginationChange} />
          </Box>
        </div>
      }
    </div>
  )
})


export default CommonFeedList;
