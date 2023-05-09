import React, { useState } from "react";
import List from "./List.jsx"
import Counter from "./Counter.jsx";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);

  return (
    <>
      <div className="title text-center">
        <h1 className="text-center mt-5">todos</h1>
      </div>

      <List
        setInputValue={setInputValue}
        inputValue={inputValue}
        setToDos={setToDos}
        toDos={toDos}
      />
      <div className="container border border-ligth p-1" style={{ width: "24rem" }}>  </div>
      <div className="container border border-ligth p-1" style={{ width: "23rem" }}>  </div>

      <Counter toDos={toDos} />

    </>
  );
};

export default ToDoList;
