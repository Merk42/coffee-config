import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType:'prompt',
      includeAssets:['favicon.ico', "apple-touch-icon.png"],
      manifest:{
        name:"Coffee Config",
        short_name:"Coffee",
        description:"Tool for pour over coffee",
        icons:[{
          src: '/android-chrome-192x192.png',
          sizes:'192x192',
          type:'image/png',
          purpose:'favicon'
        },
        {
          src:'/android-chrome-512x512.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'favicon'
        },
        {
          src: '/apple-touch-icon.png',
          sizes:'180x180',
          type:'image/png',
          purpose:'apple touch icon',
        },
        {
          src: '/maskable_icon.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'any maskable',
        }
      ],
      theme_color:'#894b00',
      background_color:'#fff',
      display:"standalone",
      scope:'/etc/coffee-config',
      start_url:"/etc/coffee-config/index.html",
      orientation:'portrait'
      }
    }) 
  ],
  base: './'
})

