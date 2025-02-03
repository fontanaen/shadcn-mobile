import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shadcn mobile",
  description: "Beautiful and accessible IOS-like modal components for Vue 3",

  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/modal' },
      { text: 'GitHub', link: 'https://github.com/fontanaen/shadcn-mobile' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Playground', link: '/playground' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Modal', link: '/components/modal' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fontanaen/shadcn-mobile' }
    ]
  }
})
