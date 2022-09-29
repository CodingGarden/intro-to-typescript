<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useQuasar } from 'quasar';
import { useQueryProvider } from 'vue-query';

useQueryProvider({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const $q = useQuasar();
const darkQuery = '(prefers-color-scheme: dark)';
const queryList = window.matchMedia(darkQuery);
$q.dark.set(queryList.matches);
queryList.addEventListener('change', (event) => {
  $q.dark.set(event.matches);
});
</script>

<template>
  <q-toolbar class="bg-black text-white">
    <q-toolbar-title>
      <q-btn :to="{ name: 'home' }">
        Vue CRUD Client
      </q-btn>
    </q-toolbar-title>
  </q-toolbar>
  <q-layout>
    <q-page-container>
      <q-page class="container">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
  .container {
    width: 90%;
    margin: 0 auto;
  }
</style>
