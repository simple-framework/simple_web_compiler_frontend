import React, { useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

const OutputPreviewTablist = () => {
    const { outputFiles } = useContext(OutputFilesContext)
    let fileTabs = []

    if(outputFiles.length !== 0)
        for(let [filename, contents] of Object.entries(Object.entries(outputFiles)[0][1]['files'])) {
            fileTabs.push(
                <Tab eventKey={filename} title={filename} key={filename}>
                    <div>{contents}</div>
                </Tab>
            )
        }

    return (
        <Tabs defaultActiveKey='augmented_conf'>
            {fileTabs}
        </Tabs>
    )
}

export default OutputPreviewTablist
