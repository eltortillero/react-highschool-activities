import { useEffect, useState } from 'react';
import './App.css'
import { TodoFormulary } from './formulary';

export interface Todo {
  id: string; // ! 
  name: string;
  date: Date;
  description: string;
}


export const createId = ():string => (Math.floor(Math.random() * 10000)).toString(32);
const createDate = ():Date => new Date();

type TodoList = Array<Todo>;



function App() {
  const createRandomTodo = ():void => {
    const newTask = {
      id: createId(),
      name: createId(),
      date: createDate(),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, itaque.'
    };
    addNewTodo(newTask);
  }
  const removeTodoById = (id:string):void => {
    setTaskList((currentTodoList) => {
      const newTodoList = currentTodoList.filter((task) => task.id !== id);
      window.localStorage.setItem('todoList', JSON.stringify(newTodoList));
      return newTodoList;
    });
  }
  const [taskList, setTaskList] = useState<TodoList>([]);
  const addNewTodo = (todo:Todo) => {
    setTaskList((currentList) => {
      const todoList = [...currentList, todo];
      window.localStorage.setItem('todoList', JSON.stringify(todoList));
      return todoList;
    });

  } 
  useEffect(() => {
    const stringedTodoList = window.localStorage.getItem('todoList');
    if(stringedTodoList) {
      const savedTodoList = JSON.parse(stringedTodoList);
      setTaskList(savedTodoList);
    }
  }, []);

  return (
    <div className="App">
      <h2>
        My todo list
      </h2>
      <div>
        <button type="button" onClick={createRandomTodo}>
          Create random todo
        </button>
      </div>
      <TodoFormulary addTodo={addNewTodo} />
      <ol>
        {
          taskList.map(({ id, name, date, description }) => {
            return <li className="task"  key={id}>
              <div>
                <div className="flex space-between align-start">
                <h3>
                  {name}
                </h3>
                <button type='button' onClick={() => removeTodoById(id)}>
                    Delete todo
                </button>
                </div>
                <h6>
                  { date.toString() }
                </h6>
                <p>
                  {description} 
                </p>
              </div>
            </li>
          })
        }
      </ol>
    </div>
  )
}

export default App
