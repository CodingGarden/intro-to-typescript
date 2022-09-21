<script setup lang="ts">
import { useQuery } from 'vue-query';
import { findAll, type APIError } from '@/lib/API';
import type { TodoWithId } from '@/types';

const {
  isLoading,
  error,
  data,
} = useQuery<TodoWithId[], APIError>('findAll', () => findAll());
</script>

<template>
  <div>
    <div v-if="isLoading" class="q-pa-md flex flex-center">
      <q-circular-progress
        indeterminate
        size="50px"
      />
    </div>
    <q-banner v-if="error" inline-actions class="text-white bg-red">
      {{ error.response?.data?.message || error.message }}
    </q-banner>
    <div v-if="data">
      <q-card v-for="todo in data" :key="todo._id.toString()">
        <q-card-section>
          {{ todo.content }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
