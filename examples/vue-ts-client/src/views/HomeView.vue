<script setup lang="ts">
import { useQuery } from 'vue-query';
import { findAll, type APIError } from '@/lib/API';
import type { TodoWithId } from '@/types';
import TodoForm from '@/components/TodoForm.vue';
import TodoItem from '@/components/TodoItem.vue';
import LinearLoading from '../components/LinearLoading.vue';

const { isFetching, error, data } = useQuery<TodoWithId[], APIError>(
  'findAll',
  findAll,
  {
    select(todos) {
      return todos.slice().reverse();
    },
  },
);
</script>

<template>
  <div>
    <q-banner v-if="error" inline-actions class="text-white bg-red">
      {{ error.response?.data?.message || error.message }}
    </q-banner>
    <todo-form />
    <linear-loading :is-loading="isFetching" />
    <div v-if="data">
      <todo-item v-for="todo in data" :key="todo._id.toString()" :todo="todo" class="q-mb-sm">
        <slot>
          <q-card-actions class="row justify-end">
            <q-btn
              :to="{ name: 'todo', params: { id: todo._id.toString() } }"
              color="primary"
            >
              Edit
            </q-btn>
          </q-card-actions>
        </slot>
      </todo-item>
    </div>
  </div>
</template>
