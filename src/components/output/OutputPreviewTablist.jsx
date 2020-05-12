import React, { useContext, useState } from 'react'
import {Paper, Tab, Tabs, AppBar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

import OutputPreviewTab from './OutputPreviewTab'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const OutputPreviewTablist = () => {
    const { outputFiles } = useContext(OutputFilesContext)
    let fileTabs = []
    let fileNav = []

    const [value, setValue] = useState(0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    if (Object.entries(outputFiles['compilations']).length !== 0) {
        const selectedCompilation = outputFiles['compilations'][outputFiles['selected']]
        const files = selectedCompilation ? selectedCompilation['files'] : []
        var index = 0
        for (let [filename, contents] of Object.entries(files)) {
            fileTabs.push(
                <OutputPreviewTab key={index} value={value} index={index}>{contents}</OutputPreviewTab>
            )
            fileNav.push(<Tab key={index} label={filename} wrapped/>)
            index++
        }
    }

    return (
        <Paper className={classes.root}>
            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="scrollable"
          scrollButtons="auto">
                {fileNav}
            </Tabs>
            </AppBar>
        {fileTabs}
        </Paper>
    )
}

export default OutputPreviewTablist
