import React from "react";

const List = (props) => {
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
                                    props.setToDos([...props.toDos,props.inputValue])

                                    // borrado del input value
                                    props.setInputValue("");
                                }
                            }}
                        ></input>
                    </li>

                    {/* anadir lo escrito en input en la lista de toDos */}
                    {props.toDos.map((item, index) => (
                        <li
                            className="list-group-item d-flex justify-content-between"
                            key="index"
                        >
                            {item}
                            {/* espacio entre el item y el boton de borrado */}{" "}

                            {/* para eliminar alguna tarea  de la lista*/}
                            
                            <button className="btn btn-outline-light" onClick={(t) =>
                                props.setToDos(
                                    props.toDos.filter((t, currentIndex) => index != currentIndex)
                                )
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