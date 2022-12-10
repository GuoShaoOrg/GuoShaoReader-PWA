import { IconButton, InputBase } from "@mui/material";
import React from "react";
import CommonFeedList from "../component/CommonFeedList";
import { getUserLoginInfo } from "../service/UserService";
import { getLatestFeedItem, searchFeedItem } from "../utils/HttpUtil";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


function SearchPage() {

    const userInfo = getUserLoginInfo()
    const feedLisfRef = React.createRef()
    const [searchKeyword, setSearchKeyword] = React.useState("")

    const handlerSearchBtnClick = () => {
        feedLisfRef.current.refreshListData()
    }

    const handleSearchInputChange = (event) => {
        setSearchKeyword(event.target.value)
    }

    const fetchData = (refresh, page, callback) => {
        let params = {}
        let userId = ""
        let keyword = searchKeyword
        if (userInfo !== null) {
            userId = userInfo["uid"]
        }

        if (refresh) {
            params = {
                start: 0,
                size: 10,
                userId: userId,
                keyword: keyword
            }
        } else {
            params = {
                start: (page - 1) * 10,
                size: 10,
                userId: userId,
                keyword: keyword
            }
        }


        if (searchKeyword !== undefined && searchKeyword !== null && searchKeyword !== "") {
            console.log("the search key word is ", searchKeyword)
            searchFeedItem(params).then((resp) => {
                let respJson = JSON.parse(resp)
                if (resp.length > 0) {
                    callback(respJson);
                }
            }).catch((err) => {
                callback(null);
                console.log(err)
            })
        } else {
            getLatestFeedItem(params).then((resp) => {
                let respJson = JSON.parse(resp)
                if (resp.length > 0) {
                    callback(respJson);
                }
            }).catch((err) => {
                callback(null);
                console.log(err)
            })
        }
    }
    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="rounded-3xl border mt-2">
                    <InputBase
                        sx={{ ml: 1, flex: 1, maxWidth: 720 }}
                        placeholder="输入关键词搜索文章..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={handleSearchInputChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" color="primary" onClick={handlerSearchBtnClick}>
                        <SearchOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <CommonFeedList ref={feedLisfRef} fetchData={fetchData} />
        </div>
    )
}

export default SearchPage;