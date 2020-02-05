import React, { useContext, useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

const UploadFileForm = () => {
    const { dispatch } = useContext(OutputFilesContext)
    const [siteConf, setSiteConf] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('site_conf', siteConf)

        fetch('http://localhost:5000/compile', {
            method: 'POST',
            mode: 'cors',
            body: data
        }).then(res => res.json())
            .then(res => {
                dispatch({type: 'ADD_OUTPUT_FILES', files: res})
            })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormControl type='file' placeholder='Provide Site config file'
                         onChange={(e) => setSiteConf(e.target.files[0])} required />
            <FormControl type='submit' value='Compile' />
        </Form>
    )
}

export default UploadFileForm