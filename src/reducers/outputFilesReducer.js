export const outputFilesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_OUTPUT_FILES':
        const newOutput = {
            files: action.files
        }
        let stateWithFiles = {...state}
        stateWithFiles[+new Date()] = newOutput

        return stateWithFiles
    case 'REMOVE_OUTPUT_FILES':
      let stateWithoutFiles = {...state}
      delete stateWithoutFiles[action.date]

      return stateWithoutFiles
    default:
      return state;
  }
} 