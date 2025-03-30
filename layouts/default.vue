<template>
  <div class="layout">
    <Header />
    <main class="layout__main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @use '@/assets/styles/variables.scss' as *;

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: $background;

    &__main {
      flex: 1;
      padding: 24px;
    }
  }
</style>
