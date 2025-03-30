<template>
  <div class="loader-wrapper">
    <div class="spinner" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;
  .loader-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }

  .spinner {
    width: 80px;
    height: 80px;
    border: 5px solid #e5e7eb;
    border-top: 5px solid $accent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
