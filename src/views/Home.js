import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Drawer, CssBaseline, Typography, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";
import AddFeed from "./AddFeed";
import LoginRegister from "./LoginRegister";
import { AppContext } from "../App";
import FeedItemDetailPage from "./FeedItemDetailPage";
import MarkedFeedItem from "./MarkedFeedItem";
import SharedFeedItem from "./SharedFeedItem";
import SubFeedChannelList from "./SubFeedChannelList";
import FeedChannelItems from "./FeedChannelItems";


export const HomeContext = React.createContext(null);

const drawerWidth = 240;

function Home(props) {

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState("timeline");
  const [appBarTitle, setAppBarTitle] = React.useState("锅烧阅读")
  const navigate = useNavigate()
  const appContext = React.useContext(AppContext)
  const location = useLocation()


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const getTitleByIndexName = (indexName) => {
    switch (indexName) {
      case "timeline":
        return "全部文章"

      case "account":
        return "账户信息"

      case "add":
        return "添加订阅"

      case "subList":
        return "已订阅源"

      case "account":
        return "账户信息"

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
      case "timeline":
        navigate("/timeline")
        break
      case "account":
        if (!appContext.IsLogin()) {
          navigate("/login")
          return
        }
        navigate("/account")
        break
      case "add":
        navigate("/add")
        break
      case "subList":
        navigate("/subList")
        break
      case "login":
        navigate("/login")
        break
      case "marked":
        navigate("/marked")
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
          <ListItemButton selected={selectedIndex === "timeline"} onClick={() => { handlerListItemClick("timeline", "timeline") }}>
            <ListItemIcon>
              {selectedIndex === "timeline" ? (
                <RssFeedTwoToneIcon color="primary" fontSize="large" />
              ) : <RssFeedTwoToneIcon fontSize="large" />}
            </ListItemIcon>
            <ListItemText primary="全部文章" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={selectedIndex === "add"} onClick={() => { handlerListItemClick("add", "add") }}>
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
              <ListItemButton selected={selectedIndex === "subList"} onClick={() => { handlerListItemClick("subList", "subList") }}>
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
              <ListItemButton selected={selectedIndex === "marked"} onClick={() => { handlerListItemClick("marked", "marked") }}>
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
            < ListItem disablePadding>
              <ListItemButton selected={selectedIndex === "account"} onClick={() => { handlerListItemClick("account", "account") }}>
                <ListItemIcon>
                  <ListItemIcon>
                    {selectedIndex === "account" ? (
                      <PersonOutlineOutlinedIcon color="primary" fontSize="large" />
                    ) : <PersonOutlineOutlinedIcon fontSize="large" />}
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="账户信息" />
              </ListItemButton>
            </ListItem>
          </div> : null
        }
        {
          !appContext.IsLogin() ?
            <ListItem disablePadding>
              <ListItemButton selected={selectedIndex === "login"} onClick={() => { handlerListItemClick("login", "login") }}>
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
    let pathName = location.pathname
    let indexName = pathName.replaceAll("/","")
    if (location.pathname === "/") {
      setSelectedIndex("timeline")
      navigate("/timeline")
      setAppBarTitle("全部文章")
    } else {
      setSelectedIndex(indexName)
      setAppBarTitle(getTitleByIndexName(indexName))
    }
  }, [location])

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
          <Routes>
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/account" element={<Timeline />} />
            <Route path="/add" element={<AddFeed />} />
            <Route path="/subList" element={<SubFeedChannelList />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/feed/item/:itemId" element={<FeedItemDetailPage />} />
            <Route path="/feed/channel/:channelId" element={<FeedChannelItems />} />
            <Route path="/marked" element={<MarkedFeedItem />} />
            <Route path="/f/s/:itemId" element={<SharedFeedItem />} />
          </Routes>

        </Box>
      </Box>
    </HomeContext.Provider>
  )
}
export default Home;
