<template>
  <div class="pagination" v-if="totalResults">
    <button
      class="pagination__btn"
      @click="goToPage(1)"
      :disabled="currentPage === 1"
      aria-label="Первая страница"
    >
      <Icon name="ic:baseline-first-page" />
    </button>

    <button
      class="pagination__btn"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      aria-label="Назад"
    >
      <Icon name="ic:baseline-chevron-left" />
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination__btn"
      :class="{ 'pagination__btn--active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination__btn"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      aria-label="Вперёд"
    >
      <Icon name="ic:baseline-chevron-right" />
    </button>

    <button
      class="pagination__btn"
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
      aria-label="Последняя страница"
    >
      <Icon name="ic:baseline-last-page" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    defineEmits,
    defineProps,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue';

  const props = defineProps({
    currentPage: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    totalResults: { type: Number, required: true },
  });

  const emit = defineEmits(['update:page']);
  const screenWidth = ref(0);

  onMounted(() => {
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth;
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
      screenWidth.value = window.innerWidth;
    });
  });

  const totalPages = computed(() =>
    Math.ceil(props.totalResults / props.pageSize)
  );

  const visiblePages = computed(() => {
    const pages = [];
    const maxVisible =
      screenWidth.value < 400 ? 1 : screenWidth.value < 500 ? 3 : 5;

    let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages.value, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
      emit('update:page', page);
    }
  }
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .pagination {
    margin-top: 24px;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    &__btn {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 500;
      color: $text;
      background-color: $card;
      border: 1px solid $border;
      border-radius: $radius-sm;
      cursor: pointer;
      min-width: 36px;
      transition: background-color $transition, border-color $transition;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background-color: $accent-light;
        border-color: $accent;
        color: white;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &--active {
        background-color: $accent;
        color: white;
        border-color: $accent-dark;
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
</style>
