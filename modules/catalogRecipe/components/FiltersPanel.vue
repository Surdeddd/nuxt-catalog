<template>
  <div class="filters-panel">
    <UiSearch
      v-model="searchQuery"
      placeholder="Поиск рецепта"
      icon-name="mdi:magnify"
      class="filters-panel__search"
      @debounced-input="$emit('update:search', searchQuery)"
    />

    <UiSelect
      v-model="selectedCuisine"
      :options="CONST_CUISINES"
      label="Кухня"
      placeholder="Выберите кухню"
      class="filters-panel__select"
      @update:modelValue="$emit('update:cuisine', $event)"
    />

    <UiSelect
      v-model="selectedDiet"
      :options="CONST_DIETS"
      label="Диета"
      placeholder="Выберите диету"
      class="filters-panel__select"
      @update:modelValue="$emit('update:diet', $event)"
    />

    <div class="filters-panel__actions">
      <button class="reset-button" @click="resetFilters">
        <Icon name="mdi:close-circle-outline" />
        <span>Сбросить</span>
      </button>

      <div class="view-toggle">
        <button
          @click="$emit('toggleView', 'grid')"
          :class="[
            'toggle-button',
            { 'toggle-button--active': viewMode === 'grid' },
          ]"
          aria-label="Плитка"
        >
          <Icon name="mdi:view-grid" />
        </button>
        <button
          @click="$emit('toggleView', 'list')"
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
  const props = defineProps<{
    modelValue?: string;
    cuisine?: string;
    diet?: string;
    viewMode: ViewMode;
  }>();

  const emit = defineEmits<{
    (e: 'update:search', value: string): void;
    (e: 'update:cuisine', value: string): void;
    (e: 'update:diet', value: string): void;
    (e: 'toggleView', mode: ViewMode): void;
  }>();

  const searchQuery = ref(props.modelValue || '');
  const selectedCuisine = ref(props.cuisine || '');
  const selectedDiet = ref(props.diet || '');

  const resetFilters = () => {
    searchQuery.value = '';
    selectedCuisine.value = '';
    selectedDiet.value = '';

    emit('update:search', '');
    emit('update:cuisine', '');
    emit('update:diet', '');
  };

  watch(
    () => props.modelValue,
    val => (searchQuery.value = val || '')
  );
  watch(
    () => props.cuisine,
    val => (selectedCuisine.value = val || '')
  );
  watch(
    () => props.diet,
    val => (selectedDiet.value = val || '')
  );
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .filters-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;

    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      align-items: end;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;

      @media (max-width: 600px) {
        flex-direction: column-reverse;
        align-items: stretch;
      }
    }
  }

  .reset-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    color: $danger;
    background-color: transparent;
    border: 1px solid $danger;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba($danger, 0.07);
    }

    svg {
      font-size: 18px;
    }
  }

  .view-toggle {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $accent;
    color: white;
    border: none;
    padding: 10px 12px;
    border-radius: $radius-sm;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s ease;

    &--active {
      background-color: $accent-dark;
    }

    &:hover {
      transform: scale(1.05);
    }

    svg {
      font-size: 20px;
    }
  }
</style>
