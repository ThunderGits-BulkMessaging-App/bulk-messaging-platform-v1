import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../auth/auth";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Editor from "../components/editor/Editor";
import PreviewModal from "../components/previewModal/PreviewModal";

function NewTemp() {
  const [viewModal, setViewModal] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .post(
        "http://localhost:3100/api/v1/user/newtemplate",
        {
          content: code,
          name: name,
        },
        config
      )
      .then((res) => {
        toast.success("Successfully added new template", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  const view = () => {
    setViewModal(true);
  };

  const closeView = (value) => {
    setViewModal(value);
  };

  const data = (d) => {
    setCode(d);
  };

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            {viewModal ? (
              <PreviewModal
                view={viewModal}
                closeView={closeView}
                code={code}
              />
            ) : (
              ""
            )}

            <Editor data={data} />

            <div className='temp_button_grp'>
              <div className='form-group'>
                <label for='emailSubject' style={{ color: "#707070" }}>
                  Name for the template:
                </label>
                <input
                  type='text'
                  className='form-control temp'
                  id='emailSubject'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                type='button'
                className='temp-save'
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                type='button'
                className='temp-preview'
                onClick={() => view()}
              >
                Preview
              </button>
            </div>
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

export default NewTemp;
