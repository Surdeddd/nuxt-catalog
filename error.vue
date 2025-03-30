<template>
  <div class="error">
    <div class="error__content">
      <h1 class="error__code">Ошибка</h1>
      <p class="error__message">{{ message }}</p>
      <button class="error__button" @click="goHome">
        Вернуться на главную
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from 'nuxt/app';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps<{ error: NuxtError }>();

  const is404 = props.error.statusCode === 404;
  const message = is404
    ? 'Страница не найдена'
    : props.error.statusMessage || props.error.message;

  const goHome = () => {
    clearError();
    router.push('/');
  };
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .error {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #0f0f0f, #1f1f1f);
    color: white;
    padding: 40px;

    &__content {
      text-align: center;
    }

    &__code {
      font-size: 60px;
      margin-bottom: 16px;
      color: $accent;
    }

    &__message {
      font-size: 18px;
      margin-bottom: 32px;
    }

    &__button {
      background-color: $accent;
      color: white;
      padding: 12px 24px;
      font-size: 16px;
      border: none;
      border-radius: $radius-sm;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: $accent-dark;
      }
    }
  }
</style>
