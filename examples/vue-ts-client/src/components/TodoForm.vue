<script setup lang="ts">
import { ref } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { createOne, type APIError } from '@/lib/API';
import type { Todo, TodoWithId } from '@/types';

const newTodo = ref('');
const queryClient = useQueryClient();

const { isLoading, error, mutateAsync } = useMutation<
TodoWithId,
APIError,
Todo
>(createOne, {
  onSuccess() {
    queryClient.invalidateQueries('findAll');
  },
});

const formSubmitted = async () => {
  if (newTodo.value.trim()) {
    await mutateAsync({
      content: newTodo.value,
      done: false,
    });
    newTodo.value = '';
  }
};
</script>

<template>
  <q-banner v-if="error" inline-actions class="text-white bg-red">
    {{ error.response?.data?.message || error.message }}
  </q-banner>
  <q-form @submit.prevent="formSubmitted" class="q-mt-md">
    <q-input
      :disable="isLoading"
      v-model="newTodo"
      label="New Todo"
      class="q-mb-md"
    />
    <div class="row justify-end">
      <q-btn
        :disabled="!newTodo"
        :loading="isLoading"
        label="Add Todo"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>
