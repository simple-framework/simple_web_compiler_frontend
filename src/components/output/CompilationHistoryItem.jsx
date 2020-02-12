import React, { useContext } from 'react'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const CompilationHistoryItem = (props) => {
    const { dispatch } = useContext(OutputFilesContext);
    const cardBorder = props.compilationErrored ? 'danger' : 'light'
    const cardBg = props.selected ? 'info' : ''
    const icon = props.compilationErrored ? faTimes : faCheck
    
    return (
        <Card body bg={cardBg} border={cardBorder} className='compilation-history-item' onClick={() => dispatch({type: 'SET_SELECTED_COMPILATION', date: props.compilationTime })}>
            <Button variant='danger' onClick={() => dispatch({type: 'REMOVE_OUTPUT_FILES', date: props.compilationTime })}>X</Button>
            <div>{formatDate(new Date(Number(props.compilationTime)))}</div>
            <FontAwesomeIcon icon={icon} />
            {props.compilationErrored ? 'Compilation has failed' : 'Compilation has succeeded'}
        </Card>
    )
}

export default CompilationHistoryItem;