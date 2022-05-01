import {defineConfig, loadEnv} from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig(({mode}) => {


  Object.assign(process.env, loadEnv(mode, process.cwd()))
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  console.log("Environment: ", process.env.NODE_ENV)

  return {
    base: process.env.NODE_ENV === "production" ? "/pokedex/" : "/",
    //outputDir: path.resolve(__dirname, "./docs"),
    transpileDependencies: [],
    plugins: [
      createVuePlugin(),

      EnvironmentPlugin([
        'NODE_ENV',
        'BASE_URL',
        'NAME_API',
        'VUE_APP_NAME',
        'VUE_APP_LOGLEVEL',
        'VUE_APP_BASE_URL',
        'VUE_APP_API_STAGE',
        'VUE_APP_HTTP_CLIENT'
      ]),
      splitVendorChunkPlugin()
    ],
    server: {
      port: 8080
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: './runtimeConfig',
          replacement: './runtimeConfig.browser',
        },
      ],
      extensions: ['.vue', '.js', '.ts']
    },
    build: {
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: false,
      // outDir: path.resolve(__dirname, "./docs"),
    }
  }
});
