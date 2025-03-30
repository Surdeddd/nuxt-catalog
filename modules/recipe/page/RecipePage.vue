<template>
  <div class="recipe">
    <NuxtLink to="/" class="recipe__back">
      <Icon name="mdi:arrow-left" class="icon" />
      Назад
    </NuxtLink>

    <UiLoader v-if="loading" class="recipe__loader" />

    <div v-else-if="recipe" class="recipe__content">
      <h1 class="recipe__title">{{ recipe.title }}</h1>

      <img :src="recipe.image" :alt="recipe.title" class="recipe__image" />

      <div class="recipe__info">
        <div>
          <Icon name="mdi:timer" />
          <span>{{ recipe.readyInMinutes }} мин.</span>
        </div>
        <div>
          <Icon name="mdi:silverware-fork-knife" />
          <span>{{ recipe.servings }} порций</span>
        </div>
        <div v-if="recipe.healthScore">
          <Icon name="mdi:heart" />
          <span>Польза: {{ recipe.healthScore }}</span>
        </div>
      </div>

      <div
        class="recipe__ingredients"
        v-if="recipe.extendedIngredients?.length"
      >
        <h2>Ингредиенты</h2>
        <ul>
          <li v-for="ing in recipe.extendedIngredients" :key="ing.id">
            <img
              :src="`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`"
              :alt="ing.name"
              class="ingredient-img"
            />
            {{ ing.original }}
          </li>
        </ul>
      </div>

      <div
        class="recipe__steps"
        v-if="recipe.analyzedInstructions?.[0]?.steps?.length"
      >
        <h2>Пошаговое приготовление</h2>
        <ol>
          <li
            v-for="step in recipe.analyzedInstructions[0].steps"
            :key="step.number"
          >
            {{ step.step }}
          </li>
        </ol>
      </div>

      <div class="recipe__summary" v-html="recipe.summary"></div>
    </div>

    <div v-else class="recipe__not-found">
      <h2>Рецепт не найден</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.params.id as string;

  const { data: recipe, loading, error, fetchData } = useApi<Recipe>();

  onMounted(() => {
    fetchData({
      endpoint: `/recipes/${id}/information`,
      method: 'get',
    });
  });
</script>

<style scoped lang="scss">
  @use '@/assets/styles/variables.scss' as *;

  $font-title: 32px;
  $font-heading: 22px;
  $font-text: 16px;
  $font-small: 15px;

  .recipe {
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
      font-size: $font-text;
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
      font-size: $font-title;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
      color: $text;

      @media (max-width: 600px) {
        font-size: 24px;
      }
    }

    &__image {
      width: 100%;
      max-height: 420px;
      object-fit: cover;
      border-radius: $radius;
      margin-bottom: 24px;
      box-shadow: $shadow;
    }

    &__info {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 32px;
      font-size: $font-text;
      gap: 16px;

      @media (max-width: 600px) {
        font-size: 14px;
      }

      div {
        display: flex;
        align-items: center;
        gap: 8px;
        color: $text;
      }
    }

    &__ingredients {
      margin-bottom: 32px;

      h2 {
        font-size: $font-heading;
        margin-bottom: 12px;

        @media (max-width: 600px) {
          font-size: 18px;
        }
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;

          .ingredient-img {
            width: 36px;
            height: 36px;
            object-fit: contain;
          }
        }
      }
    }

    &__steps {
      margin-bottom: 32px;

      h2 {
        font-size: $font-heading;
        margin-bottom: 12px;

        @media (max-width: 600px) {
          font-size: 18px;
        }
      }

      ol {
        padding-left: 20px;

        li {
          margin-bottom: 10px;
          line-height: 1.6;
          font-size: $font-text;

          @media (max-width: 600px) {
            font-size: 14px;
          }
        }
      }
    }

    &__summary {
      font-size: $font-small;
      line-height: 1.7;
      color: $muted-text;

      @media (max-width: 600px) {
        font-size: 13px;
      }
    }

    &__not-found {
      text-align: center;
      font-size: $font-text;
      color: $muted-text;
      margin: 48px 0;

      @media (max-width: 600px) {
        font-size: 14px;
      }
    }
  }
</style>
