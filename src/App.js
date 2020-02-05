import React from 'react';
import { Container, Row } from 'react-bootstrap';

import './App.css';

import Header from './components/layout/Header';
import UploadFileForm from './components/input/UploadFileForm';
import OutputFilesPreviewTablist from './components/output/OutputPreviewTablist';

import OutputFilesContextProvider from './contexts/OutputFilesContext';

function App() {
  return (
    <div className="App">
      <Header />
      <OutputFilesContextProvider>
        <Container>
          <Row>
            <UploadFileForm />
          </Row>
          <Row>
            <OutputFilesPreviewTablist />
          </Row>
        </Container>
      </OutputFilesContextProvider>
    </div>
  );
}

export default App;
