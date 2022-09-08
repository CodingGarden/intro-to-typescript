import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import HomeIcon from '@mui/icons-material/Home';
import MUILink from '@mui/material/Link';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LoadingButton from '@mui/lab/LoadingButton';

import { findOne, deleteOne, updateOne, APIError } from '@/api';
import { TodoWithId } from '@/types';
import TodoItem from '@/components/todos/TodoItem';

interface TodoPageProps extends Record<string, string | undefined> {
  id?: string;
}

export default function TodoPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<TodoPageProps>();
  const { isLoading, isFetching, isError, data, error } = useQuery<
    TodoWithId,
    APIError
  >(['findOne', params.id], () => findOne(params.id || 'not-found'));

  const updateOneMutation = useMutation(
    (todoWithId: TodoWithId) =>
      updateOne(todoWithId._id.toString(), {
        content: todoWithId.content,
        done: !todoWithId.done,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries(['findOne', params.id]);
        queryClient.invalidateQueries(['findAll']);
      },
    }
  );

  const deleteOneMutation = useMutation((id: string) => deleteOne(id), {
    onSuccess() {
      queryClient.invalidateQueries(['findAll']);
      navigate('/');
    },
  });

  return (
    <Grid
      sx={{ marginTop: '2rem' }}
      flexDirection="column"
      justifyContent="center"
      container
    >
      <Breadcrumbs aria-label="breadcrumb">
        <MUILink component={Link} to="/" color="inherit">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </MUILink>
      </Breadcrumbs>
      {isError && (
        <Alert severity="error">
          Error: {error.response?.data.message || error.message}
        </Alert>
      )}
      {(isLoading || isFetching) && (
        <Grid justifyContent="center" container>
          <CircularProgress />
        </Grid>
      )}
      {!(isLoading || isFetching) && data && (
        <TodoItem todo={data}>
          <Grid container justifyContent="space-between">
            <LoadingButton
              loading={updateOneMutation.isLoading}
              onClick={() => updateOneMutation.mutate(data)}
              size="small"
            >
              Toggle Done
            </LoadingButton>
            <LoadingButton
              loading={deleteOneMutation.isLoading}
              onClick={() => deleteOneMutation.mutate(data._id.toString())}
              size="small"
            >
              Remove Todo
            </LoadingButton>
          </Grid>
        </TodoItem>
      )}
    </Grid>
  );
}
