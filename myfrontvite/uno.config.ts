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
                ],
                roboto: [
                    {
                        name: 'Roboto',
                        weights: ['400', '500', '700'], // 可根據需要指定其他權重
                    },
                ],
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
                'border-radius': '45%',
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
                'border-radius': '45%',
                animation: 'wave-animation-2 20s infinite linear',
            }
        ],
        [
            'button_bg_slide_end', {
                'background-position': 'left',
                color: 'white',
            }
        ],
        [
            'button_bg_slide_start', {
                background: 'linear-gradient(to right, #4777a6 50%, transparent 50%)',
                'background-size': '200%',
                cursor: 'pointer',
                transition: 'all 1s ease',
                'background-position': 'right',
            }
        ],
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
        'container': 'max-w-1200px mx-auto px-20px w-full box-border',
        'gradient': 'bg-[linear-gradient(90deg,_#34495E_0%,_#34495E_40%,_rgba(236,240,241,1)_40%)]',
        'btn': 'px-3 py-2 rounded cursor-pointer duration-300',
        'divider': "after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:mt-[32px]",
        'button_bg_slide': 'button_bg_slide_start hover:button_bg_slide_end text-steel_blue',
        'underline_expand': 'relative no-underline after:content-[""] after:absolute after:left-50% after:bottom-0 after:w-0 after:h-2px after:bg-black after:hover:w-full after:hover:left-0  after:duration-300',

        //to do list 作品
        'title': 'font-size-24px text-bg-5 font-roboto font-500 ',
        'subtitle': 'font-size-20px text-bg-5 font-roboto font-500',
        'paragraph': 'font-size-16px text-bg-5 font-roboto font-400',
        'remerk': 'font-size-24px text-bg-3 font-roboto font-400',
        'placeholder': 'font-size-16px text-bg-3 font-roboto font-400',
        'status': 'font-size-24px text-bg-2 font-roboto font-italic',
        'add': 'font-size-24px text-bg-2 font-roboto',
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
            'steel_blue': '#4777a6',//輔色
            'emerald_green': '#27AE60',
            'slate_green_pale': '#87929d',//輔色
            'base_1': '#4A90E2',

            //to do list 作品
            //to do list 作品
            'sub_1': '#00408B',
            'danger': '#D0021B',
            'warning': '#F5A623',
            'choose': '#FFF2DC',
            'bg-1': '#F2F2F2',
            'bg-2': '#C8C8C8',
            'bg-3': '#757575',
            'bg-4': '#FFFFFF',
            'bg-5': '#000000',
            'bg-6': '#E1E1E1',
        }
    }
})
