import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Drawer,
  CssBaseline,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen(event) {
    this.setState({
      open: true,
    });
    this.props.drawerStateChangedTo(true);
  }

  handleDrawerClose(event) {
    this.setState({
      open: false,
    });
    this.props.drawerStateChangedTo(false);
  }

  getUserPageSelector() {
    const { classes } = this.props;
    let userSelector = this.props.userSelectorShown();
    console.log("USER SELECTOR :  " + userSelector)
    if (userSelector === "NOT_SHOWN") {
      return <React.Fragment />;
    } else if (userSelector === "DETAILS") {
      return (
        <ButtonGroup className={classes.buttonGroup}>
          <Button disabled className={classes.pageButton} style={{color: "secondary"}}>About</Button>
          <Button className={classes.pageButton} onClick={() => this.props.onPageChange("PHOTOS")}>Photos</Button>
        </ButtonGroup>
      );
    } else if (userSelector === "PHOTOS") {
      return <ButtonGroup className={classes.buttonGroup}>
        <Button className={classes.pageButton} onClick={() => this.props.onPageChange("DETAILS")}>About</Button>
        <Button disabled className={classes.pageButton} style={{color: "secondary"}}>Photos</Button>
      </ButtonGroup>;
    }
  }

  render() {
    const { classes } = this.props;
    open = this.state.open;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="secondary"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.pageTitle}>
              {this.props.pageName}
            </Typography>
            {this.getUserPageSelector()}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  pageTitle: {
    flexGrow: 1,
  },
  buttonGroup: {
    color: "white",
  },
  pageButton: {
    textTransform: "none",
    color: "white",
  },
  pageButton: {
    // textTransform: "none",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export default withStyles(styles)(TopBar);
