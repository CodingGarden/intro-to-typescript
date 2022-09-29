<script setup lang="ts">
import type { TodoWithId } from '@/types';

const props = defineProps<{ todo: TodoWithId }>();
</script>

<template>
  <q-card :key="props.todo._id.toString()" class="q-mb-sm">
    <q-card-section>
      {{ props.todo.done ? '✅' : '' }} {{ props.todo.content }}
    </q-card-section>
    <slot />
  </q-card>
</template>
