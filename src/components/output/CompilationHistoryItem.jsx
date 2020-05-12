import React, { useContext } from 'react'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'
import { MenuItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import ErrorIcon from '@material-ui/icons/Error'
import DeleteIcon from '@material-ui/icons/Delete'

const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const CompilationHistoryItem = (props) => {
    const { dispatch } = useContext(OutputFilesContext);
    const icon = props.compilationErrored ? <ErrorIcon style={{fill: "red"}}/> : <DoneIcon style={{fill: "green"}}/>
    
    return (
        <MenuItem selected={props.selected} button onClick={() => dispatch({type: 'SET_SELECTED_COMPILATION', date: props.compilationTime })}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{formatDate(new Date(Number(props.compilationTime)))}</ListItemText>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => dispatch({type: 'REMOVE_OUTPUT_FILES', date: props.compilationTime })}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </MenuItem>
    )
}

export default CompilationHistoryItem;