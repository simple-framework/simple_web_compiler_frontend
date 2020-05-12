import React, { useContext, useState, useEffect } from 'react'
import { OutputFilesContext } from '../../contexts/OutputFilesContext'

import { Fab, Input, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonError: {
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    form: {
      display:'flex'
    }
  }));

const UploadFileForm = () => {
    const { dispatch } = useContext(OutputFilesContext)
    const [siteConf, setSiteConf] = useState('')
    const [selectedVersion, setSelectedVersion] = useState('');
    const [versions, setVersions] = useState([]);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const classes = useStyles();

    // const backendURL = `http://0.0.0.0:8080`
    const backendURL = `http://api-simple-compiler.app.cern.ch`

    useEffect(() => {
      fetch(backendURL + '/versions')
        .then(res => res.json())
        .then(res => {
          setVersions(res)
          setSelectedVersion(res[0])
        })
    }, [])

    const uploadOutcome = () => {
        if(success)
            return <CheckIcon/>;
        else if(error)
            return <CloseIcon/>;
        else
            return <SaveIcon/>;
      }

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error,
      });

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!['yml', 'yaml'].includes(siteConf.name.split('.').slice(-1)[0])) {
          setAlert('Invalid File: File extension should be .yml/.yaml.')
          return
        } else setAlert('')
        console.log(siteConf)
        if (siteConf.size > 1e7) {
          setAlert('Invalid File: File too big (max size: 10 MB)')
          return
        } else setAlert('')


        const data = new FormData();
        data.append('site_conf', siteConf)
        data.append('version', selectedVersion)
        setLoading(true);
        fetch(backendURL + '/compile', {
            method: 'POST',
            mode: 'cors',
            body: data
        }).then(res => res.json())
            .then(res => {
                dispatch({ type: 'ADD_OUTPUT_FILES', files: res })
                setLoading(false);
                if('error' in res) {
                    setError(true)
                    setSuccess(false)
                } else {
                    setError(false)
                    setSuccess(true)
                }
                setTimeout(()=>{setSuccess(false); setError(false)}, 1000)
            })
    }
    
    return (
      <div>
        {alert ? <Alert severity='error'>{alert}</Alert> : ''}
        <form onSubmit={handleSubmit} className={classes.form}>
            <Input type="file" onChange={(e) => setSiteConf(e.target.files[0])} required/>
            <FormControl className={classes.formControl} required>
              <InputLabel id='version-label'>version</InputLabel>
              <Select
                labelId="version-label"
                id="compiler-version-select"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                >
                  {versions.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </FormControl>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    type='submit'
                >
                    {uploadOutcome()}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
        </form>
      </div>
    )
}

export default UploadFileForm