export const addNote = (note) => {
    return {
      type: 'ADD_NOTE',
      payload: note,
    };
  };
  
  export const editNote = (id, updatedNote) => {
    return {
      type: 'EDIT_NOTE',
      payload: { id, updatedNote },
    };
  };
  
  export const deleteNote = (id) => {
    return {
      type: 'DELETE_NOTE',
      payload: id,
    };
  };
  
  