const initialState = {
  notes: [],
  sorting: {
    sortBy: '',
  },
};

const noteReducer = (state = initialState, action) => {
  let filteredNotes;
  let updatedNotes;
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case "EDIT_NOTE":
      updatedNotes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, ...action.payload.updatedNote }
          : note
      );
      return {
        ...state,
        notes: updatedNotes,
      };

    case "DELETE_NOTE":
      filteredNotes = state.notes.filter((note) => note.id !== action.payload);
      return {
        ...state,
        notes: filteredNotes,
      };
    default:
      return state;
  }
};
export default noteReducer;
