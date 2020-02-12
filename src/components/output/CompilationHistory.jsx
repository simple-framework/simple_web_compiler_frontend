import React, { useContext } from 'react'
import CompilationHistoryItem from './CompilationHistoryItem'
import { OutputFilesContext } from '../../contexts/OutputFilesContext' 
import { CardGroup } from 'react-bootstrap'

const CompilationHistory = () => {
    const { outputFiles } = useContext(OutputFilesContext)
    let items = []
    if(outputFiles['compilations'])
        for(let [compilationTime, compilation] of Object.entries(outputFiles['compilations']))
            items.push(<CompilationHistoryItem key={compilationTime} selected={outputFiles['selected'] === compilationTime} compilationErrored={'error' in compilation['files']} compilationTime={compilationTime}/>)
    return (
        <CardGroup id='compilation-history'>
            {items}
        </CardGroup>
    )
}

export default CompilationHistory;