import { defineConfig, presetWebFonts, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'google', // 默认提供商
            fonts: {
                noto: [
                    {
                        name: 'Noto Sans SC',
                        weights: ['400', '700'],
                    },
                ]
            },
        }),
    ],
    rules: [
    ],

    //自訂義綜合class
    shortcuts: {
        'container': 'max-w-1200px mx-auto px-20px w-full',
        'gradient': 'bg-[linear-gradient(90deg,_#34495E_0%,_#34495E_40%,_rgba(236,240,241,1)_40%)]',
        'btn':'px-3 py-2 rounded cursor-pointer duration-300'
    },

    //自訂主題
    theme: {
        colors: {
            'sub': '#87CEEB',
            'base': '#002366',
            'bg': '#CCCCCC',
            'subbg': '#F5F5F5',
            'deep_purple': '#8E44AD',
            'light_lavender': '#F3E5F5',
            'bright_violet': '#9B59B6',
            'deep_slate_green': '#34495E',
            'beige_mist': '#ECF0F1',
            'emerald_green': '#27AE60',
            'slate_green_pale': '#87929d',
        }
    }
})
