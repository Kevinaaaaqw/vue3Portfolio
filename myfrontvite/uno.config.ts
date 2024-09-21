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
        [
            'wave', {
                position: 'absolute',
                width: '200vw',
                height: '200vw',
                'background-color': '#87929d',
                opacity: '1',
                top: '-85vw',
                left: '50%',
                'margin-left': '-100vw',
                'margin-top': '-100vw',
                'border-radius': '38%',
                animation: 'wave-animation 15s infinite linear',
            }
        ],
        [
            'wave_2', {
                position: 'absolute',
                width: '200vw',
                height: '200vw',
                'background-color': '#34495E',
                opacity: '.7',
                top: '115vw',
                left: '50%',
                'margin-left': '-100vw',
                'margin-top': '-100vw',
                'border-radius': '43%',
                animation: 'wave-animation-2 20s infinite linear',
            }
        ]
    ],
    preflights: [
        {
            getCSS: () => `
        @keyframes wave-animation {
         from {
            transform: rotate(0deg);
            }
        to {
            transform: rotate(360deg);
            }
        }
        @keyframes wave-animation-2 {
         from {
            transform: rotate(360deg);
            }
            to {
            transform: rotate(0deg);
            }
        }
      `,
        },
    ],

    //自訂義綜合class
    shortcuts: {
        'container': 'max-w-1200px mx-auto px-20px w-full',
        'gradient': 'bg-[linear-gradient(90deg,_#34495E_0%,_#34495E_40%,_rgba(236,240,241,1)_40%)]',
        'btn': 'px-3 py-2 rounded cursor-pointer duration-300',
        'divider': "after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:mt-[32px]"
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
            'deep_slate_green': '#34495E',//主色1
            'beige_mist': '#ECF0F1',//主色2
            'emerald_green': '#27AE60',
            'slate_green_pale': '#87929d',//輔色
        }
    }
})
