const outputFilesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_OUTPUT_FILES':
        let compilationTime = new Date()
        const newOutput = {
            files: action.files
        }
        let stateWithFiles = {...state}
        if(!('compilations' in stateWithFiles)) stateWithFiles['compilations'] = {}
        stateWithFiles['compilations'][+compilationTime] = newOutput
        stateWithFiles['selected'] = +compilationTime

        return stateWithFiles
    case 'REMOVE_OUTPUT_FILES':
      let stateWithoutFiles = {...state}
      let outFiles = JSON.parse(localStorage.getItem('output_files'))
      delete outFiles['compilations'][action.date]
      if(outFiles['selected'] === action.date)
        outFiles['selected'] = undefined
      localStorage.setItem('output_files', JSON.stringify(outFiles))
      delete stateWithoutFiles['compilations'][action.date]
      return stateWithoutFiles
    case 'SET_SELECTED_COMPILATION':
      let newState = {...state}
      newState['selected'] = action.date

      return newState
    default:
      return state;
  }
};

export default outputFilesReducer;