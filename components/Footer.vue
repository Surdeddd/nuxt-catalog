<template>
  <footer class="footer">
    <p class="footer__text">© 2025. Все права защищены.</p>
  </footer>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/variables.scss' as *;

  .footer {
    background-color: $accent-dark;
    color: white;
    padding: 16px 24px;
    text-align: center;
    border-top-left-radius: $radius-sm;
    border-top-right-radius: $radius-sm;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
    font-weight: 500;

    &__text {
      font-size: 14px;
      color: $subtle-text;

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }
</style>
