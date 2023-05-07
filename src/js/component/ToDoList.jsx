import React, { useState } from "react";


const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);

  return (
    <>
      <div className="title text-center">
        <h1 className="text-center mt-5">todos</h1>
      </div>
      <div className="container card" style={{ width: "25rem" }}>
        <ul className="list-group list-group-flush ">
          <li className="list-group-item">
            <input
              className="border border-white w-100"
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              //activo la funcion para agregar a toDos lo que se escribio en input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setToDos(toDos.concat(inputValue));
                  // borrado del input value
                  setInputValue("");
                }
              }}
            ></input>
          </li>
          {/* anadir lo escrito en input en la lista de toDos */}
          {toDos.map((item, index) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key="index"
            >
              {item}
              {/* espacio entre el item y el boton de borrado */}{" "}
              {/* para eliminar alguna tarea  de la lista*/}
              
              <button
                className="btn btn-outline-light"
                onClick={(t) =>
                  setToDos(
                    toDos.filter((t, currentIndex) => index != currentIndex)
                  )
                }
              >
                X
              </button>
            </li>
          ))}

        </ul>
      </div>
      <div className="container " style={{ width: "25rem" }}>
        <span className="counter"> {toDos.length} task </span>
      </div>
    </>
  );
};

export default ToDoList;
