import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { TodoWithId, Todo } from '@/types';
import { APIError, createOne } from '@/api';

export default function TodoForm() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');
  const { isLoading, mutateAsync, isError, error } = useMutation<
    TodoWithId,
    APIError,
    Todo
  >((todoToCreate) => createOne(todoToCreate), {
    onSuccess() {
      queryClient.invalidateQueries(['findAll']);
    },
  });

  const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    await mutateAsync({
      content: newTodo,
      done: false,
    });
    setNewTodo('');
  };

  return (
    <Grid sx={{ margin: '1rem' }} flexDirection="column">
      {isError && (
        <Alert severity="error">
          Error: {error.response?.data.message || error.message}
        </Alert>
      )}
      <form onSubmit={formSubmitted}>
        <TextField
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.currentTarget.value)}
          id="newTodo"
          name="newTodo"
          label="New Todo"
          variant="outlined"
          disabled={isLoading}
        />
        <Grid sx={{ marginTop: '0.5rem' }} container justifyContent="flex-end">
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            variant="contained"
          >
            Add Todo
          </LoadingButton>
        </Grid>
      </form>
    </Grid>
  );
}
