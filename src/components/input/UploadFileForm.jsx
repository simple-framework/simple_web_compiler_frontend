import React, { useContext, useState } from 'react'
import { Form, FormControl, Spinner } from 'react-bootstrap'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

const UploadFileForm = () => {
    const { dispatch } = useContext(OutputFilesContext)
    const [siteConf, setSiteConf] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('site_conf', siteConf)
        setLoading(true);
        fetch('http://localhost:5000/compile', {
            method: 'POST',
            mode: 'cors',
            body: data
        }).then(res => res.json())
            .then(res => {
                dispatch({type: 'ADD_OUTPUT_FILES', files: res})
                setLoading(false);
            })
    }
    const LoadSpinner = () => {
        if(isLoading)
            return <Spinner animation='border' variant='light' />
        return ''
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormControl type='file' placeholder='Provide Site config file'
                            onChange={(e) => setSiteConf(e.target.files[0])} required />
                <FormControl type='submit' value='Compile' />
                <LoadSpinner />
            </Form>
        </div>
    )
}

export default UploadFileForm