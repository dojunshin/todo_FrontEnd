import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import api from "./utils/api";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import todoItem from '../src/components/TodoBoard'

function App() {

  const [todoList, setTodoList] = useState([]);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  }

  const [todoWork, setTodoWork] = useState("");

  const insertTask = async () => {

    try {
      const response = await api.post("/tasks",{task:todoWork,isComplete:false});

      if(response.status === 200) {
        // 새로 추가된 할 일을 todoList에 추가
        setTodoList([...todoList, response.data.data]);
        //입력필드 초기화
        setTodoWork("");
      } else {
        throw new Error("Failed to add task");
      }
    }catch(err) {
      console.error("error : , "  + err);
    }
  }

  //App이 켜졌을때 getTasks 호출

  useEffect(()=> {
    getTasks();
  }, [])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value = {todoWork}
            onChange={(e) => setTodoWork(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={insertTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} setTodoList={setTodoList} />
    </Container>
  );
}

export default App;
