import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value += 1;
  }

  return { count, doubleCount, increment };
});

export default useCounterStore;
