// import  {useEffect} from "react";
import React from "react";
import { useEffect } from "react";
const URLBASE = "http://assets.breatheco.de/apis/fake/todos/user/edgardiaz"

const List = (props) => {
  const createUser = async ()=> {
    try{
        let response = await fetch (`${URLBASE}`,
        {method: "POST",
          headers : {"Content-Type": "application/json"},
          body:JSON.stringify([])
      })
        if (response.ok){getAllTask()}
                        
    }catch(err){
        console.log(err)
    }
  }

  const getAllTask = async ()=> {
    try{
        let response = await fetch (`${URLBASE}`)
        let data = await response.json()
        if (response.status ==404){
          createUser()
          }
          else { props.setToDos(data)}

    }catch(err){
        console.log(err)
    }
  }


  useEffect(() => {
    getAllTask()
  },[])
  
  const addTask = async()=>{
    try{
      let response = await fetch (`${URLBASE}`,
        {method:"PUT",
        headers :{"Content-Type":"application/json"},
        body : JSON.stringify([...props.toDos, {label:props.inputValue, done: false}])
      }
      )
      let data = await response.json()
      props.setToDos([...props.todos, data])
       
       
       
    } catch(err){ 
      console.log(err)} 
  }

  const deleteTask = async (props)=>{
    try{
      let response = await fetch (`${URLBASE}`,
      {
        method:"DELETE"
      }
    )
      let data = await response.json(
        props.setToDos(data)
      )
    }catch(err){
      console.log(err)
    }
  }


  return (
        <>

            <div className="container border border-ligth" style={{ width: "25rem" }}>
                <ul className="list-group list-group-flush ">
                    <li className="list-group-item">
                        <input
                            className="border border-white w-100"
                            onChange={(e) => props.setInputValue(e.target.value)}
                            type="text"
                            placeholder="What needs to be done?"
                            value={props.inputValue}
                            //activo la funcion para agregar a toDos lo que se escribio en input
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    // props.setToDos(props.toDos.concat(props.inputValue));
                                    
                                   // ya no se guarda local, ahora tiene que anadirlo a la api 
                                   addTask()
                                   props.setToDos([...props.toDos, props.inputValue])
                                   // para dejar el input en blanco
                                   props.setInputValue("");
                                   
                                }
                            }}
                        >
                        </input>
                    </li>

                    {/* anadir lo escrito en input en la lista de toDos */}
                    {props.toDos.map((item, index) => (
                        
                        
                        <li
                            className="list-group-item d-flex justify-content-between"
                            key={index}
                            
                        >
                          {/* cambio a el nombre a .label, del key del objeto que esta en la api  */}
                            {item.label}
                            {/* espacio entre el item y el boton de borrado */}{" "}

                            {/* para eliminar alguna tarea  de la lista*/}
                            
                            <button className="btn btn-outline-light" onClick={() =>(
                                // props.setToDos(
                                //     props.toDos.filter((t, currentIndex) => ({index.label} !)= currentIndex)
                                // )
                                deleteTask({index}))
                            }
                            >
                                <i className="fa-solid fa-x" style={{color:"red"}}></i>
                            </button>

                        
                        </li>
                    ))}

                </ul>
            </div>

        </>
    )
}

export default List 