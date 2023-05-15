import React, { useState, useEffect } from "react";

const List = (props) => {
//   const [toDos, setToDos] = useState([]);
//   const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Fetch the to-do list from the API
    const fetchToDos = async () => {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/edgardiaz"
        );
        const data = await response.json();
        props.setToDos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToDos();
  }, []);

  const addToDo = async () => {
    try {
      // Add the new task to the API
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/edgardiaz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            ...props.toDos,
            { label: props.inputValue, done: false },
          ]),
        }
      );
      const data = await response.json();
      props.setToDos(data);
      props.setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDo = async (index) => {
    try {
      // Remove the task from the API
      const response = await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/edgardiaz/${index}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      props.setToDos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateToDo = async (index, done) => {
    try {
      // Update the task in the API
      const response = await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/edgardiaz/${index}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: props.toDos[index].label, done }),
        }
      );
      const data = await response.json();
      props.setToDos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container border border-light" style={{ width: "25rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input
              className="border border-white w-100"
              onChange={(e) => props.setInputValue(e.target.value)}
              type="text"
              placeholder="What needs to be done?"
              value={props.inputValue}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  addToDo();
                }
              }}
            ></input>
          </li>
         
         
         
          {props.toDos.map((item, index) => (
            <li className="list-group-item d-flex justify-content-between" key={index}>
              <span
                style={{ textDecoration: item.done ? "line-through" : "none" }}
                onClick={() => updateToDo(index, !item.done)}
              >
                {item.label}
              </span>
              <button
                className="btn btn-outline-light"
                onClick={() => deleteToDo(index)}
              >
                <i className="fa-solid fa-x" style={{ color: "red" }}></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;