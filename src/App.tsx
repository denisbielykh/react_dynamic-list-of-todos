/* eslint-disable max-len */
//#region imports
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { CompletedStatus } from './types/Status';
//#endregion

export const App: React.FC = () => {
  //#region states
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(CompletedStatus.all);
  const [query, setQuery] = useState('');
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  //#endregion

  useEffect(() => {
    setLoading(true);

    getTodos(status)
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, [status]);

  useEffect(() => {
    setPreparedTodos(
      todos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeQuery={setQuery}
                changeStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={preparedTodos}
                changeSelectedTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id || null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} changeSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
