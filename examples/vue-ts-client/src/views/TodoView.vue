<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { findOne, deleteOne, updateOne, type APIError } from '@/lib/API';
import { useQuery, useMutation, useQueryClient } from 'vue-query';
import type { Todo, TodoWithId } from '@/types';
import TodoItem from '@/components/TodoItem.vue';
import LinearLoading from '@/components/LinearLoading.vue';

const queryClient = useQueryClient();
const route = useRoute();
const router = useRouter();
const id = route.params.id.toString();

const { isFetching, error, data } = useQuery<TodoWithId, APIError>(
  ['findOne', id],
  () => findOne(id),
);

const { isLoading: isUpdating, mutateAsync: updateMutateAsync } = useMutation<
TodoWithId,
APIError,
Todo
>((todo) => updateOne(
  id,
  todo,
), {
  onSuccess() {
    queryClient.invalidateQueries(['findOne', id]);
    queryClient.invalidateQueries(['findAll']);
  },
});

const { isLoading: isDeleting, mutateAsync: deleteMutateAsync } = useMutation<
{},
APIError,
string
>(deleteOne, {
  onSuccess() {
    queryClient.invalidateQueries(['findAll']);
    router.push('/');
  },
});

const toggleDone = () => {
  if (!data.value) return;
  updateMutateAsync({
    content: data.value.content,
    done: !data.value.done,
  });
};
</script>

<template>
  <q-banner v-if="error" inline-actions class="text-white bg-red">
    {{ error.response?.data?.message || error.message }}
  </q-banner>
  <linear-loading :is-loading="isFetching" />
  <todo-item v-if="data" :todo="data">
    <slot>
      <q-card-actions class="row justify-between">
        <q-btn
          :loading="isUpdating"
          @click="toggleDone"
          color="primary"
        >
          Toggle Done
        </q-btn>
        <q-btn
          @click="deleteMutateAsync(id)"
          :loading="isDeleting"
          color="red"
        >
          Remove
        </q-btn>
      </q-card-actions>
    </slot>
  </todo-item>
</template>
