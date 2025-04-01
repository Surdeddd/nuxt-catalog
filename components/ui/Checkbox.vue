<template>
  <label class="checkbox">
    <input type="checkbox" :checked="modelValue" @change="onChange" />
    <span class="checkbox__box">
      <Icon name="mdi:check" class="checkbox__icon" />
    </span>
    <span class="ui-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
  defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      emit('update:modelValue', target.checked);
    }
  };
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;

    input {
      display: none;
    }

    &__box {
      width: 20px;
      height: 20px;
      background-color: white;
      border: 2px solid $accent;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    input:checked + &__box {
      background-color: $accent;
      border-color: $accent-dark;
    }

    &__icon {
      color: white;
      font-size: 14px;
      opacity: 0;
      transform: scale(0.5);
      transition: 0.2s ease;
    }

    input:checked + &__box .checkbox__icon {
      opacity: 1;
      transform: scale(1);
    }

    &__label {
      font-size: 14px;
      color: $text;
    }
  }
</style>
