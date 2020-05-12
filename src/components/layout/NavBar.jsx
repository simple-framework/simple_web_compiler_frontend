import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position='fixed'>
            <Toolbar>
                <Typography variant='h6' noWrap>
                    SIMPLE YAML compiler
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
