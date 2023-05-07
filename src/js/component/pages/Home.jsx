import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//include images into your bundle
const styleLi ={color: "red"}

//create your first component
const Home = () => {
	const [inputValue, setInputValue]= useState("")
  const [toDos, setToDos] =useState([])
  return (
    <>
		<div className=" text-center">
			<h1 className="text-center mt-5">Todos</h1><FontAwesomeIcon icon="window-unit" />
		</div>
    <div className="container card" style={{width: "25rem"}}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> 
            <input onChange={(e)=> setInputValue(e.target.value)} 
              type="text"placeholder="What needs to be done?"
              value={inputValue} 
              onKeyUp={(e)=> e.key === "Enter" ? setToDos(toDos.concat(inputValue)) : null} ></input>
          </li>
            {toDos.map((item, index)=> 
            <li 
                className="list-group-item" 
                key="index" >
                  {item}{""} 
                  <i className="fa-regular fa-x" 
                  style={styleLi} 
                  onclick = {() =>
                    setToDos(
                      toDos.filter(
                        (t, currentIndex) => 
                        index != currentIndex
                        )
                        )
                      } 
                  >
                  </i>
              </li>  
               )
              }
          
          </ul>
    </div>
    <div className="container" style={{width: "25rem"}}>1 task</div>
    </>
);
};

export default Home;
