import React from "react";

const Counter = (props) =>(<>
    <div className="container " style={{ width: "25rem" }}>
        <span className="counter"> {props.toDos.length} {props.toDos.length < 2 ? "item left" :"items left" }   </span>
    </div>
</>

)
export default Counter