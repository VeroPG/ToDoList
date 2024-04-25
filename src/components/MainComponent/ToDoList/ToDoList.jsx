// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import ToDoCard from "./ToDoCard/ToDoCard";
import data from "./data";
import { v4 as uuidv4 } from "uuid";

const ToDoList = () => {
  //Estado inicial: list = data --> [{},{},{},{},{},{}]
  const [list, setList] = useState(data); // [{},{},{}] lista de items
  const [values, setValues] = useState({
    task: "",
    desc: "",
  });

  // FUNCION FLECHA PARA PINTAR ELEMENTOS
  const paintCards = () =>
    list.map((item, index) => (
      <ToDoCard
        key={uuidv4()} //index o identificador unico
        task={item.task}
        desc={item.desc}
        delete={() => deleteItem(index)}
      />
    ));

  // FUNCION FLECHA PARA BORRAR UN UNICO ELEMENTO-->se pasa como propiedad al hijo
  const deleteItem = (pos) => {
    const remainingItems = list.filter((item, index) => index !== pos);
    setList(remainingItems); // modifica el estado con lo restante
  };

  // FUNCION FLECHA PARA BORRAR LA LISTA
  const clearItems = () => setList([]);

  // FUNCION FLECHA PARA RECARGAR LAS TAREAS DESDE DATA.JS
  const resetItems = () => setList(data);

  // FUNCION FLECHA PARA VALIDACION DE LONGITUD
  const checkLength = () => {
    if (taskRef.current.value.length < 6) {
      alert("Task name must be at least 6 characters long!");
      return false;
    } else {
      return true;
    }
  };

  // FUNCION FLECHA PARA CREAR UN UNICO ELEMENTO
  const createItem = () => {
    const task = taskRef.current.value;
    const desc = descRef.current.value;
    if (checkLength()) {
      const item = { task, desc }; // Nuevo objeto destino
      taskRef.current.value = "";
      descRef.current.value = "";
      setList([item, ...list]); // Añade el nuevo destino a la lista
    }
  };

  /*   messageRef.current.innerHTML = "Task added successfully!";
    messageTimeout();
    const messageTimeout = () => setTimeout(hideMessage, 5000);
 */

  // FUNCION FLECHA PARA BOTON AÑADIR TAREA--> PREVENT DEFAULT ON SUBMIT AND CREATE ITEM
  const handleSubmit = (e) => {
    e.preventDefault();
    createItem();
  };

  // FUNCION FLECHA-->   HOOKS ON CHANGE STATE
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // TIMER 20 SEGUNDOS PARA BORRAR LOS CAMPOS SI NO SE PULSA BOTON
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setValues({ task: "", desc: "" });
      taskRef.current.value = "";
      descRef.current.value = "";
    }, 20000);
    return () => clearTimeout(timeOut);
  }, [values.task]);

  // PARA HACER USO DE REFERENCIAS SE DECLARAN E INICIAN A NULL
  const taskRef = useRef(null);
  const descRef = useRef(null);

  return (
    <section>
      <h2>To-Do List</h2>
      <button onClick={clearItems}>Borrar tareas</button>
      <button onClick={resetItems}>Recargar Tareas</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Título</label>
        <br />
        <input type="text" name="task" onChange={handleChange} ref={taskRef} />
        <br />
        <label htmlFor="desc">Descripción</label>
        <br />
        <input type="text" name="desc" onChange={handleChange} ref={descRef} />
        <br />
        {values.task && values.desc ? (
          <button type="submit">Crear Tarea</button>
        ) : (
          <></>
        )}
      </form>
      {paintCards()}
    </section>
  );
};

export default ToDoList;
