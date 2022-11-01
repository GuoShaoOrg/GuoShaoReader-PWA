import React, { useEffect } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Drawer, CssBaseline, Typography, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import Timeline from "./Timeline";
import AddFeed from "./AddFeed";
import LoginRegister from "./LoginRegister";
import { AppContext } from "../App";
import FeedItemDetailPage from "./FeedItemDetailPage";
import MarkedFeedItem from "./MarkedFeedItem";
import SharedFeedItem from "./SharedFeedItem";
import SubFeedChannelList from "./SubFeedChannelList";
import FeedChannelItems from "./FeedChannelItems";
import AccountPage from "./AccountPage";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import FeedChannelDetailPage from "./FeedChannelDetailPage";


export const HomeContext = React.createContext(null);

const drawerWidth = 240;

function Home(props) {

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState("all");
  const [appBarTitle, setAppBarTitle] = React.useState("锅烧阅读")
  const history = useHistory()
  const appContext = React.useContext(AppContext)
  const { pathname } = useLocation()


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const getTitleByIndexName = (indexName) => {
    switch (indexName) {
      case "all":
        return "全部文章"

      case "add":
        return "添加订阅"

      case "subList":
        return "已订阅源"

      case "account":
        return "用户设置"

      case "marked":
        return "收藏文章"

      default:
        break;
    }
  }


  const handlerListItemClick = (index, menuType) => {
    setMobileOpen(!mobileOpen)
    setSelectedIndex(index)
    let title = getTitleByIndexName(index)
    setAppBarTitle(title)
    switch (menuType) {
      case "all":
        history.push({
          pathname: "/all"
        })
        break
      case "account":
        if (!appContext.IsLogin()) {
          history.push({
            pathname: "/login"
          })
          return
        }
        history.push({
          pathname: "/account"
        })
        break
      case "add":
        history.push({
          pathname: "/add"
        })
        break
      case "subList":
        history.push({
          pathname: "/subList"
        })
        break
      case "login":
        history.push({
          pathname: "/login"
        })
        break
      case "marked":
        history.push({
          pathname: "/marked"
        })
        break

      default:
        break
    }
  }


  const homeContext = {
    setBarTitle: (title) => {
      setAppBarTitle(title)
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "all"} onClick={() => { handlerListItemClick("all", "all") }}>
            <ListItemIcon>
              {selectedIndex === "all" ? (
                <RssFeedTwoToneIcon color="primary" fontSize="large" />
              ) : <RssFeedTwoToneIcon fontSize="large" />}
            </ListItemIcon>
            <ListItemText primary="全部文章" />
          </ListItemButton>
        </ListItem>
        < ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "subList"} onClick={() => { handlerListItemClick("subList", "subList") }}>
            <ListItemIcon>
              <ListItemIcon>
                {selectedIndex === "subList" ? (
                  <FormatListNumberedOutlinedIcon color="primary" fontSize="large" />
                ) : <FormatListNumberedOutlinedIcon fontSize="large" />}
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="已订阅源" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "marked"} onClick={() => { handlerListItemClick("marked", "marked") }}>
            <ListItemIcon>
              <ListItemIcon>
                {selectedIndex === "marked" ? (
                  <FavoriteBorderOutlined color="primary" fontSize="large" />
                ) : <FavoriteBorderOutlined fontSize="large" />}
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="收藏文章" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "add"} onClick={() => { handlerListItemClick("add", "add") }}>
            <ListItemIcon>
              <ListItemIcon>
                {selectedIndex === "add" ? (
                  <PlaylistAddCheckOutlinedIcon color="primary" fontSize="large" />
                ) : <PlaylistAddCheckOutlinedIcon fontSize="large" />}
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="添加订阅" />
          </ListItemButton>
        </ListItem>
        {appContext.IsLogin() ?
          <div>
            < ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "account"} onClick={() => { handlerListItemClick("account", "account") }}>
                <ListItemIcon>
                  <ListItemIcon>
                    {selectedIndex === "account" ? (
                      <PersonOutlineOutlinedIcon color="primary" fontSize="large" />
                    ) : <PersonOutlineOutlinedIcon fontSize="large" />}
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="用户设置" />
              </ListItemButton>
            </ListItem>
          </div> : null
        }
        {
          !appContext.IsLogin() ?
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: "10px", marginRight: "10px", marginLeft: "10px" }} selected={selectedIndex === "login"} onClick={() => { handlerListItemClick("login", "login") }}>
                <ListItemIcon>
                  <ListItemIcon>
                    {selectedIndex === "login" ? (
                      <ExitToAppOutlinedIcon color="primary" fontSize="large" />
                    ) : <ExitToAppOutlinedIcon fontSize="large" />}
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="登录/注册" />
              </ListItemButton>
            </ListItem> : null
        }
      </List>
    </div >
  );

  useEffect(() => {
    let indexName = pathname.replaceAll("/", "")
    if (pathname === "/") {
      setSelectedIndex("all")
      history.push({
        pathname: "/all"
      })
      setAppBarTitle("全部文章")
    } else {
      setSelectedIndex(indexName)
      setAppBarTitle(getTitleByIndexName(indexName))
    }
  }, [pathname])

  return (
    <HomeContext.Provider value={homeContext}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {appBarTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <CacheSwitch>
            <CacheRoute exact path="/all" component={Timeline} />
            <CacheRoute exact path="/subList" component={SubFeedChannelList} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/add" component={AddFeed} />
            <Route exact path="/login" component={LoginRegister} />
            <Route exact path="/marked" component={MarkedFeedItem} />
            <Route path="/feed/item/:itemId" component={FeedItemDetailPage} />
            <Route path="/feed/channel/:channelId" component={FeedChannelItems} />
            <Route path="/feed/detail/:channelId" component={FeedChannelDetailPage} />
            <Route path="/f/s/:itemId" component={SharedFeedItem} />
          </CacheSwitch>
        </Box>
      </Box>
    </HomeContext.Provider>
  )
}
export default Home;
