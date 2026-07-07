# Portfolio

A Nuxt 3 (Vue 3, Composition API) single-page portfolio, rendered as a static SPA
(`ssr: false`) and animated with GSAP.

## Requirements

- Node.js `>= 18` (Node `>= 22` avoids an install-time engine warning from a
  transitive Nuxt dependency)
- [pnpm](https://pnpm.io/) (`corepack enable` will provide the version pinned in
  `package.json`)

## Build Setup

```bash
# install dependencies
$ pnpm install

# serve with hot reload at localhost:3000
$ pnpm dev

# build for production (SPA output served by the Nitro server)
$ pnpm build

# preview the production build
$ pnpm preview

# generate a static site into .output/public (deploy to any static host)
$ pnpm generate
```

For a detailed explanation of how things work, check out the
[Nuxt 3 documentation](https://nuxt.com/docs).

## Directory Structure

### `app.vue`

The application entry. Renders `<NuxtLayout>` + `<NuxtPage>`.

### `assets`

Uncompiled assets such as Sass files, images, and fonts. These are processed by
the build tool and referenced via the `~/assets/...` alias (e.g. imported in
`<script setup>`).

More info: [Nuxt assets](https://nuxt.com/docs/guide/directory-structure/assets).

### `components`

Vue.js components. Auto-imported by Nuxt, so they can be used in templates
without an explicit import.

More info: [Nuxt components](https://nuxt.com/docs/guide/directory-structure/components).

### `composables`

Reusable Composition API functions (`useMouseHover`, `useSplitText`,
`useAnimateOut`). Auto-imported by Nuxt.

More info: [Nuxt composables](https://nuxt.com/docs/guide/directory-structure/composables).

### `layouts`

Layout wrappers. `default.vue` wraps every page and renders `<slot />`.

More info: [Nuxt layouts](https://nuxt.com/docs/guide/directory-structure/layouts).

### `pages`

Application views and routes. Nuxt reads every `*.vue` file here and configures
Vue Router automatically.

More info: [Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages).

### `plugins`

Plugins registered before the Vue app mounts (`defineNuxtPlugin`). Used here to
register the Lottie component, `vue3-touch-events`, and to provide `$gsap`.

More info: [Nuxt plugins](https://nuxt.com/docs/guide/directory-structure/plugins).

### `public`

Static files served at the site root. Example: `public/webflow.js` is served as
`/webflow.js`.

More info: [Nuxt public](https://nuxt.com/docs/guide/directory-structure/public).
