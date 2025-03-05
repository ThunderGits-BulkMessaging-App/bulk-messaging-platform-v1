import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../auth/auth";

import "react-toastify/dist/ReactToastify.css";

import "../styles/dashboard.css";
import GroupModal from "../components/Modal/Modal";
import GroupCard from "../components/groupCard/GroupCard";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Groups() {
  const [modalView, setModalView] = useState(false);
  const [groups, setGroups] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  // const [confirm, setConfirm] = useState(false);
  const [groupId, setGroupId] = useState("");

  const handleModal = (res) => {
    setModalView(res);
  };

  const onRequestClose = () => {
    setModalClose(true);
    setIsOpen(false);
  };

  const onHandleConfirm = () => {
    axios
      .post(`http://localhost:3100/api/v1/user/deletegroup/${groupId}`)
      .then((res) => {
        console.log("successfully deleted");
        setModalClose(true);
        setIsOpen(false);
        toast.success("Successfully deleted group", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 1300);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:3100/api/v1/user/viewgroups", config)
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((err) => console.log(err));
  }, [modalView, modalIsOpen]);

  const handleDelete = (id) => {
    setIsOpen(true);
    setGroupId(id);
  };

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            <button class='add-record-btn' onClick={() => setModalView(true)}>
              Add Group
            </button>
            <div class='group-grid-container'>
              {groups.map((group) => (
                <GroupCard
                  name={group.name}
                  emails={group.emails.length}
                  handleDelete={handleDelete}
                  id={group._id}
                />
              ))}
            </div>
            <div>
              {modalView ? (
                <div>
                  <GroupModal handleModal={handleModal} />
                </div>
              ) : (
                ""
              )}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={modalClose}
              style={customStyles}
              contentLabel='Example Modal'
              className='modal'
              overlayClassName='modal-overlay'
            >
              <h2 className='modal-title'>Confirm Delete Group</h2>
              <p className='modal-text'>
                Are you sure you want to delete this group?
              </p>
              <div className='modal-buttons'>
                <button
                  className='modal-button cancel'
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
                <button
                  className='modal-button delete'
                  onClick={onHandleConfirm}
                >
                  Delete
                </button>
              </div>
            </Modal>
            <ToastContainer
              position='bottom-right'
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Groups;
