import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from '../api/apiSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  // const todoList = useGetTodoListQuery();
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodoListQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  // const [addTodo, { isSuccess: isAdded }] = useAddTodoMutation();
  // const [updateTodo, { isSuccess: isUpdated }] = useUpdateTodoMutation();
  // const [deleteTodo, { isSuccess: isDeleted }] = useDeleteTodoMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </div>
  );
};
export default TodoList;
