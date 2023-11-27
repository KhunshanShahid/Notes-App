import { createStore } from 'redux';
import rootReducer from '../reducers/noteReducer';
import notesData from "../../data";

const store = createStore(rootReducer,{ notes: notesData });

export default store;
