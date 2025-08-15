import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePartStore = defineStore('parts', () => {
  const parts = ref(null);
  const getparts = async () => {
    const response = await fetch('/api/parts');
    parts.value = await response.json();
  };

  return { parts, getparts };
});
