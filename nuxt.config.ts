// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // SPA mode (previously `ssr: false` + `target: static` in Nuxt 2)
  ssr: false,

  devServer: {
    port: 3000
  },

  // `nuxt generate` writes the static site here. A top-level, non-hidden
  // `dist/` avoids Cloudflare Pages issues with the default dot-prefixed
  // `.output/public` directory. Set Cloudflare's output directory to `dist`.
  nitro: {
    output: {
      publicDir: "dist"
    }
  },

  app: {
    head: {
      title: "Tomide",
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Hi 👋🏻 my name is Tomide. I'm a frontend engineer based in Lagos Nigeria, focused on creating functional products and unique experiences on the web."
        },
        { name: "format-detection", content: "telephone=no" }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      script: [
        {
          src: "https://code.jquery.com/jquery-3.5.1.min.js",
          integrity: "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=",
          crossorigin: "anonymous",
          type: "text/javascript",
          tagPosition: "bodyClose"
        },
        {
          src: "/webflow.js",
          type: "text/javascript",
          tagPosition: "bodyClose"
        }
      ]
    }
  },

  // Global CSS
  css: ["~/assets/css/tailwind.css", "~/styles/index.scss"],

  vite: {
    plugins: [tailwindcss()]
  },

  // Workaround for Nuxt 3.21.8 SPA regression: `resolveServerEntry` throws
  // "No entry found in rollupOptions.input" when `ssr: false`. Ensures the
  // client input object exposes both `entry` and `server` keys.
  //
  // DEV ONLY: in a production build this mutation adds a phantom `server`
  // entry to the client bundle, which breaks Vite's CSS-to-entry association
  // and drops the global stylesheet (blank/unstyled page). The dev-server
  // crash it fixes only happens under `nuxt dev`.
  // Remove once upgraded to Nuxt >= 3.21.9. See nuxt/nuxt#35033.
  hooks: {
    "vite:extendConfig"(config) {
      if (process.env.NODE_ENV === "production") return;

      const rollupInput = config.build?.rollupOptions?.input;

      if (
        !rollupInput ||
        typeof rollupInput === "string" ||
        Array.isArray(rollupInput)
      ) {
        return;
      }

      const firstInput = Object.values(rollupInput).find(
        (value) => typeof value === "string"
      );

      if (!firstInput) {
        return;
      }

      if (!rollupInput.entry) {
        rollupInput.entry = firstInput;
      }

      if (!rollupInput.server) {
        rollupInput.server = firstInput;
      }
    }
  }
});
