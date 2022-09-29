<script setup lang="ts">
const props = defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div
    :style="{ opacity: props.isLoading ? '1' : '0' }"
    class="loading q-pa-md flex flex-center"
  >
    <q-linear-progress indeterminate />
  </div>
</template>

<style scoped>
.loading {
  height: 25px;
  transition-duration: 500ms;
}
</style>
