<template>
  <div class="filters-panel">
    <UiSearch
      v-model="searchQuery"
      placeholder="Поиск книги"
      icon-name="mdi:magnify"
      class="filters-panel__search"
    />
    <UiSelect
      v-model="selectedPrintType"
      :options="CONST_PRINT_TYPES"
      label="Тип издания"
      class="filters-panel__select"
    />
    <UiCheckbox v-model="selectedOnlyFree" class="filters-panel__checkbox">
      Только бесплатные книги
    </UiCheckbox>
    <div class="filters-panel__actions">
      <button class="reset-button" @click="resetFilters">
        <Icon name="mdi:close-circle-outline" />
        <span>Сбросить</span>
      </button>
      <div class="view-toggle">
        <button
          @click="filtersBooksStore.setViewMode('grid')"
          :class="[
            'toggle-button',
            { 'toggle-button--active': viewMode === 'grid' },
          ]"
          aria-label="Плитка"
        >
          <Icon name="mdi:view-grid" />
        </button>
        <button
          @click="filtersBooksStore.setViewMode('list')"
          :class="[
            'toggle-button',
            { 'toggle-button--active': viewMode === 'list' },
          ]"
          aria-label="Список"
        >
          <Icon name="mdi:view-list" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const filtersBooksStore = useFiltersBooksStore();

  const searchQuery = computed({
    get: () => filtersBooksStore.searchQuery,
    set: value => filtersBooksStore.setSearchQuery(value),
  });

  const selectedPrintType = computed({
    get: () => filtersBooksStore.printType,
    set: value => filtersBooksStore.setPrintType(value),
  });

  const selectedOnlyFree = computed({
    get: () => filtersBooksStore.onlyFree ?? false,
    set: value => filtersBooksStore.setOnlyFree(value),
  });

  const viewMode = computed(() => filtersBooksStore.viewMode);

  const resetFilters = () => {
    filtersBooksStore.resetFilters();
  };
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .filters-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px;
    background-color: $background;
    border-radius: $radius;
    box-shadow: $shadow;
    margin-bottom: 32px;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      align-items: end;
    }

    &__search,
    &__select,
    &__checkbox {
      width: 100%;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      height: 40px;
    }

    &__actions {
      display: flex;
      justify-content: end;
      align-items: center;
      grid-column: span 1;
      gap: 12px;

      @media (max-width: 1100px) {
        justify-content: start;
      }

      @media (max-width: 600px) {
        flex-direction: column-reverse;
        align-items: stretch;
      }
    }
  }

  .reset-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    color: $danger;
    background-color: transparent;
    border: 1px solid $danger;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: rgba($danger, 0.08);
    }

    svg {
      font-size: 18px;
    }
  }

  .view-toggle {
    display: flex;
    gap: 10px;
  }

  .toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $accent-light;
    color: $accent-dark;
    border: none;
    padding: 10px;
    border-radius: $radius;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &--active {
      background-color: $accent;
      color: white;
    }

    &:hover {
      transform: scale(1.05);
    }

    svg {
      font-size: 20px;
    }
  }
</style>
