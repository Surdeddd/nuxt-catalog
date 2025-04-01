<template>
  <div class="book">
    <NuxtLink to="/" class="book__back">
      <Icon name="mdi:arrow-left" class="icon" />
      Назад к каталогу
    </NuxtLink>

    <UiLoader v-if="loading" class="book__loader" />

    <div v-else-if="book" class="book__content">
      <h1 class="book__title">{{ book.volumeInfo.title }}</h1>

      <p v-if="book.volumeInfo.subtitle" class="book__subtitle">
        {{ book.volumeInfo.subtitle }}
      </p>

      <img
        v-if="book.volumeInfo.imageLinks?.thumbnail"
        :src="book.volumeInfo.imageLinks.thumbnail"
        :alt="book.volumeInfo.title"
        class="book__image"
      />

      <div class="book__info">
        <div v-if="book.volumeInfo.authors">
          <Icon name="mdi:account" />
          <span>Автор(ы): {{ book.volumeInfo.authors.join(', ') }}</span>
        </div>
        <div v-if="book.volumeInfo.publisher">
          <Icon name="mdi:domain" />
          <span>Издательство: {{ book.volumeInfo.publisher }}</span>
        </div>
        <div v-if="book.volumeInfo.publishedDate">
          <Icon name="mdi:calendar" />
          <span>Дата публикации: {{ book.volumeInfo.publishedDate }}</span>
        </div>
        <div v-if="book.volumeInfo.pageCount">
          <Icon name="mdi:book-open-page-variant" />
          <span>{{ book.volumeInfo.pageCount }} страниц</span>
        </div>
        <div v-if="book.volumeInfo.averageRating">
          <Icon name="mdi:star" />
          <span>Рейтинг: {{ book.volumeInfo.averageRating }} / 5</span>
        </div>
      </div>

      <div
        v-if="book.volumeInfo.description"
        class="book__description"
        v-html="book.volumeInfo.description"
      />
    </div>

    <div v-else class="book__not-found">
      <h2>Книга не найдена</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const id = route.params.id as string;

  const { data: book, loading, error, fetchData } = useApi<BookItemDetailed>();

  onMounted(() => {
    fetchData({
      endpoint: `/volumes/${id}`,
      method: 'get',
    });
  });
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  .book {
    min-height: 100dvh;
    padding: 24px;
    max-width: 900px;
    margin: 0 auto;
    background: $card;
    border-radius: $radius;
    box-shadow: $shadow;

    &__back {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: $radius-sm;
      background-color: $accent;
      color: white;
      transition: all 0.2s ease;
      box-shadow: $shadow;
      margin-bottom: 20px;

      &:hover {
        background-color: $accent-dark;
        transform: translateY(-1px);
      }

      .icon {
        font-size: 20px;
      }
    }

    &__loader {
      margin: 40px auto;
      display: flex;
      justify-content: center;
    }

    &__title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
      color: $text;
    }

    &__subtitle {
      font-size: 18px;
      font-style: italic;
      color: $muted-text;
      text-align: center;
      margin-bottom: 16px;
    }

    &__image {
      width: 100%;
      max-height: 420px;
      object-fit: contain;
      border-radius: $radius;
      margin: 0 auto 24px;
      display: block;
      box-shadow: $shadow;
    }

    &__info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;
      font-size: 16px;
      color: $text;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      div {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    &__description {
      font-size: 15px;
      line-height: 1.7;
      color: $muted-text;
      margin-bottom: 40px;
    }

    &__not-found {
      text-align: center;
      font-size: 16px;
      color: $muted-text;
      margin: 48px 0;
    }
  }
</style>
