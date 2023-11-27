import Modal from "react-modal";
import styles from "./NoteForm.module.css";
import uuid from "react-uuid";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../../../Redux/actions/noteActions";
import { toast } from "react-toastify";

const NoteForm = ({ editData, setFormVisible }) => {
  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState({
    title: "",
    heading: "",
    desc: "",
    date: Date.now(),
  });

  useEffect(() => {
    if (editData) {
      setNoteData({
        title: editData.title || "",
        heading: editData.heading || "",
        desc: editData.desc || "",
        date: editData.date || Date.now(),
      });
    }
  }, [editData]);

  const noteDataHandler = (e) => {
    setNoteData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addData = (e) => {
    if (!noteData.title || !noteData.desc || !noteData.heading) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    const NoteID = "NoteID_" + uuid();
    const newNoteData = {
      ...noteData,
      id: NoteID,
    };

    dispatch(addNote(newNoteData));
    toast.success("Note Added");
    setFormVisible(false);
    e.preventDefault();
  };
  const editDataHanler = (e) => {
    e.preventDefault();
    if (!noteData.title || !noteData.desc || !noteData.heading) {
      toast.warning("Please fill in all required fields.");
      
      return;
    }
    console.log(editData.id, noteData);
    dispatch(editNote(editData.id, noteData));
    toast.success("Note Edited");
    setFormVisible(false);
  };
  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={() => setFormVisible(false)}
        contentdiv="Note Form"
        className={styles.customModal}
        overlayClassName={styles.customOverlay}
      >
        <div className={styles.main1}>
          <h2>{editData ? "Edit Note" : "Add Note"}</h2>
          <form className={styles.formStyle1}>
            <div>
              <div>Title:</div>
              <input
                type="text"
                onChange={noteDataHandler}
                name="title"
                value={noteData.title}
                placeholder="Enter Title"
                className="w-75"
              />
            </div>
            <div>
              <div>Heading:</div>
              <input
                type="text"
                onChange={noteDataHandler}
                name="heading"
                value={noteData.heading}
                className="w-75"
                required
              />
            </div>
            <div>
              <div>Description:</div>
              <input
                type="text"
                onChange={noteDataHandler}
                name="desc"
                value={noteData.desc}
                placeholder="Enter Description"
                className="w-75"
                required
              />
            </div>
            <div>
              {editData ? (
                <>
                  <button
                    type="submit"
                    onClick={editDataHanler}
                    className={styles.submitBtn}
                  >
                    Edit Note
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    onClick={addData}
                    className={styles.submitBtn}
                  >
                    Add Note
                  </button>
                </>
              )}

              <button
                className={styles.submitBtn}
                onClick={() => setFormVisible(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

NoteForm.propTypes = {
    editData: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      heading: PropTypes.string,
      desc: PropTypes.string,
      date: PropTypes.number,
    }),
    setFormVisible: PropTypes.func.isRequired,
  };

export default NoteForm;
