// Import React and useState hook
import React, { useState, useEffect } from "react";

// Define the TodoList component
const TodoList = () => {
  // Define the state for the todo list
  const [todos, setTodos] = useState([]);

  // Define the state for the input value
  const [inputValue, setInputValue] = useState("");
  const createUser = async ()=> {
    try{
        let response = await fetch ("http://assets.breatheco.de/apis/fake/todos/user/edgardiaz",
        {method: "POST",
          headers : {"Content-Type": "application/json"},
          body:JSON.stringify([])
      })
        if (response.ok){fetchTodos()}
                        
    }catch(err){
        console.log(err)
    }
  }



  // Define the async function to fetch the todo list
  const fetchTodos = async () => {
    try {
      // Fetch the todo list from the API
      const response = await fetch(
        "http://assets.breatheco.de/apis/fake/todos/user/edgardiaz"
      );
      const data = await response.json();
      if (response.status ==404){
        createUser()
        }
        else{setTodos(data)}
      // Set the todo list state
      ;
    } catch (error) {
      console.log(error);
    }
  };

  // Define the async function to add a new todo
  const addTodo = async (todo) => {
    try {
      // Add the new todo to the API
      const response = await fetch(
        "http://assets.breatheco.de/apis/fake/todos/user/edgardiaz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );
      const data = await response.json();

      // Update the todo list state
      setTodos([...todos, data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Define the async function to delete a todo
  const deleteTodo = async (id) => {
    try {
      // Delete the todo from the API
      await fetch(
        `http://assets.breatheco.de/apis/fake/todos/user/edgardiaz/`,
        {
          method: "DELETE",
        }
      );

      // Update the todo list state
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  // Define the function to handle the input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Define the function to handle the form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create the new todo object
    const newTodo = {
      label: inputValue,
      done: false,
    };

    // Add the new todo to the todo list
    addTodo(newTodo);

    // Clear the input value
    setInputValue("");
  };

  // Fetch the todo list on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.label}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the TodoList component
export default TodoList;