<template>
  <div class="select">
    <label v-if="label" class="select__label">{{ label }}</label>

    <div class="select__wrapper">
      <select :value="modelValue" class="select__native" @change="onChange">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <Icon name="mdi:chevron-down" class="select__icon" />

      <button
        v-if="modelValue"
        class="select__clear"
        @click="clearSelection"
        aria-label="Очистить выбор"
      >
        <Icon name="mdi:close" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: string;
    options: string[];
    label?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
  };

  const clearSelection = () => {
    emit('update:modelValue', props.options[0]);
  };
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .select {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__label {
      font-size: 14px;
      font-weight: 600;
      color: $text;
    }

    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__native {
      appearance: none;
      width: 100%;
      padding: 12px 16px;
      padding-right: 64px;
      font-size: 15px;
      background-color: $card;
      border: 1px solid $border;
      border-radius: $radius;
      color: $text;
      transition: border-color $transition, box-shadow $transition;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);

      &:focus {
        border-color: $accent;
        box-shadow: 0 0 0 3px rgba($accent, 0.15);
        outline: none;
      }

      &:hover {
        border-color: $accent-light;
      }
    }

    &__icon {
      position: absolute;
      right: 36px;
      pointer-events: none;
      font-size: 20px;
      color: $muted-text;
    }

    &__clear {
      position: absolute;
      right: 8px;
      background: transparent;
      border: none;
      color: $muted-text;
      cursor: pointer;
      font-size: 18px;
      padding: 4px;

      &:hover {
        color: $danger;
      }
    }
  }
</style>
