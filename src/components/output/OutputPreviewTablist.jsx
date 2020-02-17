import React, { useContext } from 'react'
import { Tab, Nav } from 'react-bootstrap'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

import OutputPreviewTab from './OutputPreviewTab'


const OutputPreviewTablist = () => {
    const { outputFiles } = useContext(OutputFilesContext)
    let fileTabs = []
    let fileNav = []
    console.log(outputFiles)
    if (Object.entries(outputFiles['compilations']).length !== 0) {
        const selectedCompilation = outputFiles['compilations'][outputFiles['selected']]
        const files = selectedCompilation ? selectedCompilation['files'] : []
        
        for (let [filename, contents] of Object.entries(files)) {
            fileTabs.push(
                <OutputPreviewTab filename={filename} key={filename}>{contents}</OutputPreviewTab>
            )
            fileNav.push(<Nav.Item><Nav.Link key={filename} eventKey={filename}>{filename}</Nav.Link></Nav.Item>)
        }
    }

    return (
        <Tab.Container defaultActiveKey='augmented_conf'>
            <Nav variant="pills">
                {fileNav}
            </Nav>
            <Tab.Content>
                {fileTabs}
            </Tab.Content>
        </Tab.Container>
    )
}

export default OutputPreviewTablist
