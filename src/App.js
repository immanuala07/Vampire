import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  // Object destructing is done to assign the values to individual variable
  // sendRequest function in app.js is a property in object which is used as fetchTask function in this file.
  // By removing the parameters to the custom hook function ( useHttp() ) we can avoid addding dependencies to the useEffect hook
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  // The useEffect Hook allows you to perform side effects in your components.
  // Some examples of side effects are: fetching data, directly updating the DOM, and timers.
  useEffect(() => {
    // tranformTasks() function is used to convert the object to array which is returned from the REST API(firebase).
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    // By adding the parameters to the fetchTasks() function we can avoid addding dependencies to the useEffect hook
    fetchTasks(
      { url: 'https://react-http-1e116-default-rtdb.firebaseio.com/tasks.json' },
      transformTasks
    ); // eslint-disable-next-line
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
