// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Books',
    },
  },
  modules: ['@nuxt/icon'],
  css: ['@/assets/styles/reset.scss', '@/assets/styles/variables.scss'],
  imports: {
    dirs: [
      'composables',
      'stores',
      'const',
      'types',
      'modules/**/composables',
      'modules/**/stores',
      'modules/**/const',
      'modules/**/types',
    ],
  },
  components: [
    { path: '~/components' },
    { path: '~/modules/catalogBooks/components', pathPrefix: false },
    { path: '~/modules/books/components', pathPrefix: false },
    { path: '~/modules/catalogBooks/page', pathPrefix: false },
    { path: '~/modules/books/page', pathPrefix: false },
  ],

  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
});
