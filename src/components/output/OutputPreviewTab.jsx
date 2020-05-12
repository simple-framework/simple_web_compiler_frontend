import React from 'react'
import {Box} from '@material-ui/core'
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

const colorLine = (lineNum, ERRORED) => {
    let style = { display: 'block' };
    if (ERRORED.includes(lineNum))
        style.backgroundColor = '#eb6e63';

    return { style };
}
const OutputPreviewTab = (props) => {
    const ERRORED = []
    return (
        <TabPanel value={props.value} index={props.index}>
            <SyntaxHighlighter language='yaml'
                showLineNumbers wrapLines={true}
                lineProps={ lineNum => colorLine(lineNum, ERRORED) }>
                {props.children}
            </SyntaxHighlighter>
        </TabPanel>
    )
}

export default OutputPreviewTab;
