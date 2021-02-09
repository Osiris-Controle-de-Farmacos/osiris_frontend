import React from 'react';
import Logo from '../../assets/images/osiris.png';
import { Typography, Box, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
function Header() {
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      minHeight: '24px',
    }
  }));
  const classes = useStyles();
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" margin="40px">
        <img src={Logo} />
        <Box display="flex" flexDirection="column" marginLeft="20px">
          <Typography variant="h3" component="h3">
            Osíris
          </Typography>
          <Typography variant="h6" component="h6">
            Controle local de fármacos
          </Typography>
        </Box>
      </Box>
      <AppBar position="static" >
        <Toolbar variant="dense" className={classes.toolbar}>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;