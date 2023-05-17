import React, { useEffect, useState } from "react";
import Counter from "./Counter.jsx";

const URLBASE = "http://assets.breatheco.de/apis/fake/todos/user/edgardiaz";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);

  const createUser = async () => {
    try {
      let response = await fetch(`${URLBASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      if (response.ok) {
        getAllTask();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTask = async () => {
    try {
      let response = await fetch(`${URLBASE}`);
      let data = await response.json();
      if (response.status == 404) {
        createUser();
      } else {
        setToDos(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (event) => {
    try {
      if (event.key === "Enter") {
        let response = await fetch(`${URLBASE}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([...toDos, { label: inputValue, done: false }]),
        });
        if (response.ok) {
          getAllTask();
          setInputValue("");
        } else {
          console.log("error addtask");
        }
      }
       
      
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log(id)
      let newTask = toDos.filter((_, index) => index != id);

      let response = await fetch(`${URLBASE}`, 
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }
      );
      if (response.ok) {
        getAllTask();
      } else {
        console.log("error Delete task");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <>
      <div className="title text-center">
        <h1 className="text-center mt-5">todos</h1>
      </div>

      <div className="container border border-ligth" style={{ width: "25rem" }}>
        <ul className="list-group list-group-flush ">
          <li className="list-group-item">
            <input
              className="border border-white w-100"
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onKeyUp = {addTask}
            />
          </li>

          {/* anadir lo escrito en input en la lista de toDos */}
          {toDos.map((item, index) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between"
                key={index}
              >
                {item.label}
                {/* espacio entre el item y el boton de borrado */}{" "}

                {/* para eliminar alguna tarea  de la lista*/}
                <button
                  className="btn btn-outline-light"
                  onClick={() => deleteTask(index)}
                >
                  <i className="fa-solid fa-x" style={{ color: "red" }}></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="container border border-ligth p-1"
        style={{ width: "24rem" }}
      >
        {" "}
      </div>
      <div
        className="container border border-ligth p-1"
        style={{ width: "23rem" }}
      >
        {" "}
      </div>

      <Counter toDos={toDos} />
    </>
  );
};

export default ToDoList;
