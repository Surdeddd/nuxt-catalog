<template>
  <div class="list">
    <UiLoader v-if="loading" class="list__loader" />
    <div v-else-if="!items?.length" class="list__empty">Нет данных</div>

    <div v-else class="list__wrapper">
      <slot :items="items" :emit="emit"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    loading: boolean;
    items: { id: number; image: string; title: string }[];
  }>();

  const emit = defineEmits<{
    (e: 'item-click', item: { id: number; image: string; title: string }): void;
  }>();
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .list {
    min-height: 100dvh;

    &__empty {
      text-align: center;
      font-size: 16px;
      padding: 40px;
      color: $muted-text;
    }

    &__loader {
      margin: 32px auto;
      display: flex;
      justify-content: center;
    }

    &__wrapper {
      width: 100%;
    }
  }
</style>
