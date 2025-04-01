<template>
  <div class="main">
    <FiltersBooksPanel />
    <UiList
      :items="result?.items || []"
      :loading="loading"
      @item-click="goToRecipe"
      v-slot="{
        items,
        emit,
      }: {
        items: BookItem[],
        emit: (e: 'item-click', item: BookItem) => void,
      }"
    >
      <div
        :class="[
          'cards',
          filtersBooksStore.viewMode === 'grid' ? 'cards--grid' : 'cards--list',
        ]"
      >
        <div
          v-for="item in items"
          :key="item.id"
          :class="[
            'cards__item',
            filtersBooksStore.viewMode === 'list' && 'cards__item--list',
          ]"
          @click="emit('item-click', item)"
        >
          <img
            :src="item?.volumeInfo?.imageLinks?.smallThumbnail"
            :alt="item.volumeInfo?.title"
            :class="[
              filtersBooksStore.viewMode === 'grid'
                ? 'cards__image'
                : 'cards__thumbnail',
            ]"
          />
          <p class="cards__title">{{ item.volumeInfo?.title }}</p>
        </div>
      </div>
    </UiList>
    <Pagination
      v-if="result"
      :current-page="filtersBooksStore.currentPage"
      :page-size="filtersBooksStore.pageSize"
      :total-results="result?.totalItems"
      @update:page="filtersBooksStore.setCurrentPage"
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
  const filtersBooksStore = useFiltersBooksStore();
  const windowWidthStore = useWindowWidthStore();
  const router = useRouter();

  const goToRecipe = (item: BookItem) => {
    router.push(`/${item.id}`);
  };

  const { result, loading, fetch } = usePagination<BooksResponse>({
    endpoint: '/volumes',
    method: 'get',
    getQueryParams: () => ({
      q: filtersBooksStore.searchQuery || 'book',
      maxResults: filtersBooksStore.pageSize,
      startIndex:
        (filtersBooksStore.currentPage - 1) * filtersBooksStore.pageSize,
      printType: filtersBooksStore.printType,
      ...(filtersBooksStore.onlyFree === true ? { filter: 'free-ebooks' } : {}),
    }),
    immediate: false,
    watchSources: [
      () => filtersBooksStore.currentPage,
      () => filtersBooksStore.searchQuery,
      () => filtersBooksStore.printType,
      () => filtersBooksStore.onlyFree,
    ],
  });

  onMounted(() => {
    const width = windowWidthStore.width;
    if (width > 1400) filtersBooksStore.setPageSize(40);
    else if (width > 1024) filtersBooksStore.setPageSize(32);
    else if (width > 768) filtersBooksStore.setPageSize(28);
    else filtersBooksStore.setPageSize(20);

    fetch();
  });
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .main {
    min-height: 100dvh;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &--grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 24px;
    }

    &--list {
      flex-direction: column;
    }

    &__item {
      background-color: $card;
      border-radius: $radius;
      overflow: hidden;
      box-shadow: $shadow;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
      }

      &--list {
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
    }

    &__image {
      width: 100%;
      max-height: 260px;
      object-fit: cover;
      border-radius: 8px;
    }

    &__thumbnail {
      width: 120px;
      height: 100%;
      object-fit: cover;
      border-radius: 0;
    }

    &__title {
      padding: 16px 18px;
      font-size: 17px;
      font-weight: 600;
      color: $text;
    }
  }
</style>
