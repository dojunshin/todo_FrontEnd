import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";
import './TodoItem.style.css'

const TodoItem = ({ item ,todoList, setTodoList}) => {

  const deleteTask = async () => {

    const id = item._id

    try {
      const response = await api.delete(`/tasks/${id}`);
      
      if (response.status === 200) {
        // todoList에서 해당 아이템을 제거
        setTodoList(todoList.filter(todo => todo._id !== id));
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  const endTask = async () => {
    const id = item._id;
    try {
      const response = await api.put(`/tasks/${id}`, { isComplete: true });
      if (response.status === 200) {
        // todoList에서 해당 아이템의 isComplete 상태를 업데이트
        setTodoList(todoList.map(todo => 
          todo._id === id ? { ...todo, isComplete: true } : todo
        ));

      } else {
        throw new Error("Failed to end task");
      }
    } catch(err) {
      console.error("Error ending task:", err);
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item${item.isComplete?' completed' : ''}`}>
          <div className="todo-content">{item.task}</div>
          <div>
            <button className="button-delete" onClick={deleteTask}>삭제</button>
            <button className="button-delete" onClick={endTask}>끝남</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
