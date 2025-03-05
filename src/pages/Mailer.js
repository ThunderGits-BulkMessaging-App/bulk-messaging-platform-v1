import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../auth/auth";
import "react-toastify/dist/ReactToastify.css";
import "../styles/dashboard.css";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import TemplateOption from "../components/templateOption/TemplateOption";

function Send() {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(" ");
  const [template, setTemplate] = useState("none");

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:3100/api/v1/user/viewgroups", config)
      .then((res) => {
        console.log(res.data.groups);
        setGroups(res.data.groups);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    console.log("clicked!");
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .post(
        "http://localhost:3100/api/v1/user/sendmail",
        {
          group,
          subject,
          message,
          template,
        },
        config
      )
      .then((res) => {
        toast.success("Successfully send mails", {
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

  const handleTemplateOption = (id) => {
    setTemplate(id);
  };

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            <div className='mailer-container'>
              <div className='email-card'>
                <h2 className='email-card__title'>Compose New Email</h2>
                <form className='email-card__form'>
                  <div className='form-group'>
                    <label for='emailTo'>To:</label>
                    <select
                      className='form-control'
                      id='emailTo'
                      onChange={(e) => setGroup(e.target.value)}
                    >
                      <option>Select a group</option>
                      {groups.map((group) => (
                        <option id={group._id} value={group._id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label for='emailSubject'>Subject:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='emailSubject'
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label for='emailMessage'>Message:</label>
                    <textarea
                      className='form-control'
                      id='emailMessage'
                      rows='8'
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='email-card__actions'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => handleSubmit()}
                      // disabled={subject !== "" && group !== ""}
                    >
                      Send <i className='fa-sharp fa-solid fa-paper-plane' />
                    </button>
                    <button type='button' className='btn btn-secondary'>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className='template-option'>
                <TemplateOption handleTemplateOption={handleTemplateOption} />
              </div>
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

export default Send;
