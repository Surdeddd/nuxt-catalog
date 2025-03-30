<template>
  <div class="main">
    <FiltersPanel
      :model-value="filtersStore.searchQuery"
      :cuisine="filtersStore.selectedCuisine"
      :diet="filtersStore.selectedDiet"
      :view-mode="filtersStore.viewMode"
      @update:search="
        value => {
          filtersStore.setSearchQuery(value);
          filtersStore.setCurrentPage(1);
        }
      "
      @update:cuisine="filtersStore.setCuisine"
      @update:diet="filtersStore.setDiet"
      @toggleView="filtersStore.setViewMode"
    />

    <UiList
      :items="result?.results || []"
      :loading="loading"
      @item-click="goToRecipe"
    >
      <template #default="{ items, emit }">
        <div
          :class="[
            'cards',
            filtersStore.viewMode === 'grid' ? 'cards--grid' : 'cards--list',
          ]"
        >
          <div
            v-for="item in items"
            :key="item.id"
            :class="[
              'cards__item',
              filtersStore.viewMode === 'list' && 'cards__item--list',
            ]"
            @click="emit('item-click', item)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              :class="[
                filtersStore.viewMode === 'grid'
                  ? 'cards__image'
                  : 'cards__thumbnail',
              ]"
            />
            <p class="cards__title">{{ item.title }}</p>
          </div>
        </div>
      </template>
    </UiList>

    <Pagination
      v-if="result"
      :current-page="filtersStore.currentPage"
      :page-size="filtersStore.pageSize"
      :total-results="result?.totalResults"
      @update:page="filtersStore.setCurrentPage"
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
  const filtersStore = useFiltersRecipeStore();
  const windowStore = useWindowWidthStore();
  const router = useRouter();

  const goToRecipe = (item: RecipeItem) => {
    router.push(`/${item.id}`);
  };

  const { result, loading, fetch } = usePagination<RecipesResponse>({
    endpoint: '/recipes/complexSearch',
    method: 'get',
    getQueryParams: () => ({
      query: filtersStore.searchQuery,
      cuisine: filtersStore.selectedCuisine,
      diet: filtersStore.selectedDiet,
      number: filtersStore.pageSize,
      offset: (filtersStore.currentPage - 1) * filtersStore.pageSize,
    }),
    immediate: false,
    watchSources: [
      () => filtersStore.currentPage,
      () => filtersStore.searchQuery,
      () => filtersStore.selectedCuisine,
      () => filtersStore.selectedDiet,
    ],
  });

  onMounted(() => {
    const width = windowStore.width;
    if (width > 1400) filtersStore.setPageSize(40);
    else if (width > 1024) filtersStore.setPageSize(32);
    else if (width > 768) filtersStore.setPageSize(28);
    else filtersStore.setPageSize(20);

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
