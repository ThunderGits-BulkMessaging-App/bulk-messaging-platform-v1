import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./editor.css";

function Editor({ data }) {
  const [code, setCode] = useState("");

  const handleChange = (d) => {
    data(d);
    setCode(d);
  };

  return (
    <div>
      <div className='code-editor'>
        <CodeEditor
          value={code}
          language='html'
          placeholder='Please enter html code.'
          onChange={(evn) => handleChange(evn.target.value)}
          padding={15}
          style={{
            fontSize: 16,
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
