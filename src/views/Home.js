import React, { useEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Drawer, CssBaseline, Typography, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedTwoToneIcon from '@mui/icons-material/RssFeedTwoTone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";
import AddFeed from "./AddFeed";
import LoginRegister from "./LoginRegister";
import { AppContext } from "../App";


const drawerWidth = 240;

function Home(props) {

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState("timeline");
  const [appBarTitle, setAppBarTitle] = React.useState("锅烧阅读")
  const navigate = useNavigate()
  const isRootPath = useMatch("/")
  const appContext = React.useContext(AppContext)


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handlerListItemClick = (index, menuType) => {
    setMobileOpen(!mobileOpen)
    setSelectedIndex(index)
    switch (menuType) {
      case "timeline":
        navigate("/timeline")
        setAppBarTitle("全部文章")
        break
      case "account":
        if (!appContext.IsLogin()) {
          navigate("/login")
          setSelectedIndex("login")
          return
        }
        navigate("/account")
        setAppBarTitle("账户信息")
        break
      case "add":
        navigate("/add")
        setAppBarTitle("添加订阅")
        break
      case "login":
        navigate("/login")
        setAppBarTitle("登录/注册")
        break

      default:
        break
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
          <ListItem disablePadding>
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
          </ListItem> : null
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
    </div>
  );

  useEffect(() => {
    setSelectedIndex("timeline")
    if (isRootPath) {
      navigate("/timeline")
    }
    setAppBarTitle("全部文章")
  }, [])

  return (
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/account" element={<Timeline />} />
          <Route path="/add" element={<AddFeed />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>

      </Box>
    </Box>
  )
}
export default Home;
