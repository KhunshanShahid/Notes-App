import { useState, useEffect } from "react";
import Modal from "react-modal";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./NoteList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";
import { deleteNote } from "../../../Redux/actions/noteActions";
import { toast } from "react-toastify";

const NoteList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredNotes, setFilteredNotes] = useState([]);
  const notes = useSelector((state) => state.notes);
  useEffect(() => {
    const filteredNotes = notes.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  }, [searchQuery, notes]);

  const dispatch = useDispatch();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    return `${day} ${month}`;
  };

  const deleteHandle = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteData = () => {
    dispatch(deleteNote(deleteId));
    setShowModal(false);
    toast.success("Note Deleted");
  };

  const handleAddClick = () => {
    setFormVisible(true);
    setEditData(null);
  };

  const handleEditClick = (data) => {
    setFormVisible(true);
    setEditData(data);
  };

  return (
    <>
      <div className={styles.SearchBar}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.main}>
        {filteredNotes.length === 0 ? (
          <p>No notes found. Add your first note!</p>
        ) : (
          filteredNotes.map((item) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{item.title}</h5>
                <h5 className={styles.date}>{formatDate(item.date)}</h5>
                <h5 className={styles.cardSubtitle}>{item.heading}</h5>
                <p className={styles.cardText}>{item.desc}</p>
                <div className={styles.cardLinkContainer}>
                  <button
                    className={styles.cardLink}
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.cardLink}
                    onClick={() => deleteHandle(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Delete Confirmation"
        className={styles.customModal}
        overlayClassName={styles.customOverlay}
      >
        <h4>Are you sure you want to delete?</h4>
        <button onClick={deleteData} className={styles.customButton}>
          Delete
        </button>
        <button
          onClick={() => setShowModal(false)}
          className={styles.customButton}
        >
          Cancel
        </button>
      </Modal>
      <div className={styles.addButton}>
        <IoAddCircleSharp
          onClick={handleAddClick}
          className={styles.addIcon}
        />
      </div>
      {formVisible && (
        <NoteForm editData={editData} setFormVisible={setFormVisible} />
      )}
    </>
  );
};

export default NoteList;
