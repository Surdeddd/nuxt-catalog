<template>
  <div class="ui-search">
    <Icon v-if="iconName" :name="iconName" class="ui-search__icon" />

    <input
      :placeholder="placeholder"
      :value="modelValue"
      class="ui-search__input"
      :class="{ 'ui-search__input--no-icon': !iconName }"
      @input="onInput"
    />

    <button
      v-if="modelValue"
      class="ui-search__clear"
      @click="clearInput"
      aria-label="Очистить"
    >
      <Icon name="mdi:close" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: string;
      placeholder?: string;
      iconName?: string;
    }>(),
    {
      iconName: '',
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'debounced-input', value: string): void;
  }>();

  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);

    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(() => {
      emit('debounced-input', value);
    }, 600);
  };

  const clearInput = () => {
    emit('update:modelValue', '');
    emit('debounced-input', '');
  };
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .ui-search {
    position: relative;
    width: 100%;

    &__icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      font-size: 20px;
      color: $muted-text;
      pointer-events: none;
    }

    &__input {
      width: 100%;
      padding: 10px 14px 10px 40px;
      font-size: 16px;
      border: 1px solid $border;
      border-radius: $radius;
      background-color: $card;
      color: $text;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      transition: border $transition, box-shadow $transition;

      &:focus {
        border-color: $accent;
        box-shadow: 0 0 0 3px rgba($accent, 0.15);
        outline: none;
      }

      &--no-icon {
        padding-left: 14px;
      }
    }

    &__clear {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      color: $muted-text;
      cursor: pointer;
      font-size: 20px;
      padding: 4px;
      border: none;
      background: none;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: $danger;
      }
    }
  }
</style>
