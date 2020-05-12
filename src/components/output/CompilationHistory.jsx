import React, { useContext } from 'react'
import CompilationHistoryItem from './CompilationHistoryItem'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'
import { List } from '@material-ui/core'

const CompilationHistory = () => {
    const { outputFiles } = useContext(OutputFilesContext)
    let items = []

    if(outputFiles['compilations'])
        for(let [compilationTime, compilation] of Object.entries(outputFiles['compilations']).reverse())
            items.push(<CompilationHistoryItem key={compilationTime} selected={outputFiles['selected'] === compilationTime} compilationErrored={'error' in compilation['files']} compilationTime={compilationTime}/>)
    return (
            <List>
                {items}
            </List>
    )
}

export default CompilationHistory;