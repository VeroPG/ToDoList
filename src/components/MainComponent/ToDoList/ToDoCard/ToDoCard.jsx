// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const ToDoCard = (props) => {
  return (
    <article>
      <h3>{props.task}</h3>
      <p>{props.desc}</p>
      <button onClick={()=>props.edit()}>Edit</button>
      <button onClick={() => props.delete()}>Borrar Tarea</button>
      <input type="checkbox" id="done" value="done" />
      <label htmlFor="done">Marcar tarea como teminada</label>
    </article>
  );
};
export default ToDoCard;
