import { defineStore } from 'pinia';
export const useFiltersRecipeStore = defineStore('filters', () => {
  const searchQuery = ref('');
  const viewMode = ref<ViewMode>('grid');
  const currentPage = ref(1);
  const pageSize = ref(20);

  const selectedCuisine = ref('');
  const selectedDiet = ref('');

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  const setViewMode = (mode: ViewMode) => {
    viewMode.value = mode;
  };

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  const setCuisine = (cuisine: string) => {
    selectedCuisine.value = cuisine;
    currentPage.value = 1;
  };

  const setDiet = (diet: string) => {
    selectedDiet.value = diet;
    currentPage.value = 1;
  };

  const setPageSize = (size: number) => {
    pageSize.value = size;
  };

  const resetFilters = () => {
    searchQuery.value = '';
    selectedCuisine.value = '';
    selectedDiet.value = '';
    viewMode.value = 'grid';
    currentPage.value = 1;
  };

  return {
    searchQuery,
    viewMode,
    currentPage,
    pageSize,
    selectedCuisine,
    selectedDiet,
    setSearchQuery,
    setViewMode,
    setCurrentPage,
    setCuisine,
    setDiet,
    resetFilters,
    setPageSize,
  };
});
