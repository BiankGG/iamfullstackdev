import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InputCreate = ({ urlApi, data }) => {
  const titleRef = useRef(null);
  const [inputT, setInputT] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;

    if (title === "") {
      return null;
    } else {
      try {
        const payload = { title };
        const response = await fetch(`${urlApi}/create`, {
          method: "POST",  // Método HTTP
          headers: {
            "Content-Type": "application/json",  // Indicamos que el contenido es JSON
          },
          body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
        });
        if (response.ok) {
          titleRef.current.value = "";
          setInputT("");
          data();
          navigate("/");
        } else {
          console.error("did not create task:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={titleRef}
          onChange={(e) => setInputT(e.target.value)}
          value={inputT}
        />
        <button>add task</button>
      </form>
    </>
  );
};

export default InputCreate;
