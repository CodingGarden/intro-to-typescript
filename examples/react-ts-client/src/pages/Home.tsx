import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { findAll, APIError } from '@/api';
import { TodoWithId } from '@/types';
import TodoForm from '@/components/todos/TodoForm';
import TodoItem from '@/components/todos/TodoItem';
import { Link } from 'react-router-dom';

function Home() {
  const { isLoading, isFetching, isError, data, error } = useQuery<
    TodoWithId[],
    APIError
  >(['findAll'], () => findAll(), {
    select: (todos) => todos?.slice().reverse(),
  });

  return (
    <Grid
      sx={{ marginTop: '2rem' }}
      flexDirection="column"
      justifyContent="center"
      container
    >
      {isError && (
        <Alert severity="error">
          Error: {error.response?.data.message || error.message}
        </Alert>
      )}
      <TodoForm />
      {(isLoading || isFetching) && (
        <Grid justifyContent="center" container>
          <CircularProgress />
        </Grid>
      )}
      {!(isLoading || isFetching) &&
        data?.map((todo) => (
          <TodoItem key={todo._id.toString()} todo={todo}>
            <Grid container justifyContent="flex-end">
              <Button component={Link} to={`/todo/${todo._id}`} size="small">
                Edit
              </Button>
            </Grid>
          </TodoItem>
        ))}
    </Grid>
  );
}

export default Home;
