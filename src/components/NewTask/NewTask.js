import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {

    sendTaskRequest({
      url: 'https://react-http-1e116-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // JSON.stringify is already done in use-http.js for the body of the fetch api.
      body: { text: taskText }
    },
      // Indirect Execution - bind method is used to prepares the function which is called for future execution.
      // Bind function allows us to "preconfigure" which arguments that a function should receive when it's getting called
      // and also define what "this" keyword should refer inside the function.
      // Syntax:
      // bind(thisArg, arg1, ... , argN)

      // Examples:
      // const boundGetX = retrieveX.bind(module);
      createTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
