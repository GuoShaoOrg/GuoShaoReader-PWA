import React from "react";
import {alpha, AppBar, InputBase, Toolbar, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";

const ExploreFeedView = () => {
    const classes = useStyles();

    return(
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>发现</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '80%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));
export default ExploreFeedView