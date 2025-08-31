import React from "react";
import TodoItem from "./TodoItem"; 

const TodoBoard = ({ todoList, setTodoList}) => {

  return (
    <div>
      <h2>Todo List</h2>
      {/* <TodoItem/> will be here once we get the todoList */}
      {todoList.length > 0 ? todoList.map((item)=>{return <TodoItem key={item._id} item={item} todoList={todoList} setTodoList={setTodoList} />}) 
      : <h2>There is no Item to show</h2>}
    </div>
  );
};

export default TodoBoard; 
