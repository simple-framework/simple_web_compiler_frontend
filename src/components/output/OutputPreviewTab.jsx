import React from 'react'
import { TabPane } from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'

const colorLine = (lineNum, ERRORED) => {
    let style = { display: 'block' };
    if (ERRORED.includes(lineNum))
        style.backgroundColor = '#eb6e63';

    return { style };
}
const OutputPreviewTab = (props) => {
    const ERRORED = []
    return (
        <TabPane eventKey={props.filename} title={props.filename}>
            <SyntaxHighlighter language='yaml'
                showLineNumbers wrapLines={true}
                lineProps={ lineNum => colorLine(lineNum, ERRORED) }>
                {props.children}
            </SyntaxHighlighter>
        </TabPane>
    )
}

export default OutputPreviewTab;
