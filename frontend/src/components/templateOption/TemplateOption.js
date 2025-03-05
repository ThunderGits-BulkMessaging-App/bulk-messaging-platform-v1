import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../auth/auth";
import "./templateOption.css";

function TemplateOption({ handleTemplateOption }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:3100/api/v1/user/viewtemplates", config)
      .then((res) => {
        setTemplates(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div class='card-temp'>
        <h2 class='card-temp-title'>Select Template</h2>
        <div class='card-temp-image'>
          <img
            src='https://static.vecteezy.com/system/resources/thumbnails/006/685/711/small_2x/illustration-graphic-cartoon-character-of-email-services-free-vector.jpg'
            alt='Template option'
          />
        </div>
        <div class='card-temp-select'>
          <label for='select-option'>Select Option:</label>
          <select
            id='select-option'
            onChange={(event) => handleTemplateOption(event.target.value)}
          >
            <option value='none'>None</option>
            {templates.map((template) => (
              <option value={template._id}>{template.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TemplateOption;
