import { defineStore } from 'pinia';

export const useWindowWidthStore = defineStore('window', () => {
  const width = ref(0);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  if (import.meta.client) {
    onMounted(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWidth);
    });
  }

  return { width };
});
