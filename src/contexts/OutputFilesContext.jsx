import React, { createContext, useReducer, useEffect } from 'react';
import outputFilesReducer from '../reducers/outputFilesReducer';

export const OutputFilesContext = createContext();

const OutputFilesContextProvider = (props) => {
  const [outputFiles, dispatch] = useReducer(outputFilesReducer, {compilations: {}, selected: ''}, () => {
    const localData = localStorage.getItem('output_files');
    return localData ? JSON.parse(localData) : {compilations: {}, selected: ''};
  });
  useEffect(() => {
    localStorage.setItem('output_files', JSON.stringify(outputFiles));
  }, [outputFiles]);
  return (
    <OutputFilesContext.Provider value={{ outputFiles, dispatch }}>
      {props.children}
    </OutputFilesContext.Provider>
  );
}
 
export default OutputFilesContextProvider;