<template>
  <header class="header">
    <h1 class="header__logo">Книги</h1>
  </header>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/variables.scss' as *;

  .header {
    background-color: $accent;
    color: white;
    padding: 16px 24px;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 600px) {
      justify-content: center;
    }

    &__logo {
      font-weight: 700;
      font-size: clamp(22px, 6vw, 32px);
      white-space: nowrap;
    }
  }
</style>
