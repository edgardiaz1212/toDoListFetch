import React from "react";

const Counter = (props) =>(<>
    <div className="container " style={{ width: "25rem" }}>
        <span className="counter"> {props.toDos.length} task </span>
    </div>
</>

)
export default Counter