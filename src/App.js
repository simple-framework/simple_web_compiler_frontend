import React from 'react';
import { Drawer, Container, CssBaseline, Toolbar } from '@material-ui/core'

import NavBar from './components/layout/NavBar';
import UploadFileForm from './components/input/UploadFileForm';
import OutputFilesPreviewTablist from './components/output/OutputPreviewTablist';
import CompilationHistory from './components/output/CompilationHistory';

import OutputFilesContextProvider from './contexts/OutputFilesContext';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <OutputFilesContextProvider>
      <Drawer variant='permanent' anchor='left' className={classes.drawer} classes={{
          paper: classes.drawerPaper,
        }}>
          <Toolbar />
        <CompilationHistory className={classes.drawerContainer}/>
      </Drawer>
      <Container className={classes.content}>
        <Toolbar />
            <UploadFileForm />
          <OutputFilesPreviewTablist />
          </Container>
        </OutputFilesContextProvider>
    </div>
  );
}

export default App;
