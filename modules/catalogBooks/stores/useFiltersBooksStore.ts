import { defineStore } from 'pinia';
export const useFiltersBooksStore = defineStore('filters', () => {
  const searchQuery = ref('');
  const viewMode = ref<ViewMode>('grid');
  const currentPage = ref(1);
  const pageSize = ref(20);
  const onlyFree = ref<boolean>(false);
  const printType = ref<PrintType>('all');

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

  const setOnlyFree = (value: boolean) => {
    onlyFree.value = value;
    currentPage.value = 1;
  };

  const setPrintType = (value: PrintType) => {
    printType.value = value;
    currentPage.value = 1;
  };

  const setPageSize = (size: number) => {
    pageSize.value = size;
  };

  const resetFilters = () => {
    searchQuery.value = '';
    onlyFree.value = false;
    printType.value = 'all';
    viewMode.value = 'grid';
    currentPage.value = 1;
  };

  return {
    searchQuery,
    viewMode,
    currentPage,
    pageSize,
    onlyFree,
    printType,
    setPrintType,
    setOnlyFree,
    setSearchQuery,
    setViewMode,
    setCurrentPage,
    resetFilters,
    setPageSize,
  };
});
