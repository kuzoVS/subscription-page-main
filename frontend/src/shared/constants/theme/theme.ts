import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily:
        'Montserrat, Vazirmatn, Apple Color Emoji, Noto Sans SC, Twemoji Country Flags, sans-serif',
    fontFamilyMonospace: 'Fira Mono, monospace',
    breakpoints: {
        xs: '25em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'never',
    white: '#ffffff',
    black: '#050a14',
    colors: {
        dark: [
            '#f0f0f0',
            '#e0e0e0',
            '#d0d0d0',
            '#b0b0b0',
            '#909090',
            '#707070',
            '#505050',
            '#3a3a3a',
            '#252525',
            '#101010'
        ],
        gray: [
            '#f8f9fa',
            '#e9ecef',
            '#dee2e6',
            '#ced4da',
            '#adb5bd',
            '#868e96',
            '#495057',
            '#343a40',
            '#212529',
            '#121212'
        ],
        blue: [
            '#e0f7ff',
            '#c0f0ff',
            '#80e6ff',
            '#40dcff',
            '#00cfff',
            '#00a8e6',
            '#0082c2',
            '#005c9e',
            '#00367a',
            '#001056'
        ],
        green: [
            '#d1f7e9',
            '#a7f0d8',
            '#6ee9c7',
            '#34e2b6',
            '#10c096',
            '#05a07a',
            '#048064',
            '#066652',
            '#065446',
            '#023630'
        ],
        yellow: [
            '#fffac7',
            '#fff18e',
            '#ffe44b',
            '#ffd708',
            '#f0c000',
            '#d1a000',
            '#a88000',
            '#8a6600',
            '#735200',
            '#4d3800'
        ],
        orange: [
            '#fff0e0',
            '#ffe0c0',
            '#ffc090',
            '#ffa060',
            '#ff8030',
            '#ff6010',
            '#d14d00',
            '#a83d00',
            '#852f00',
            '#5c2000'
        ],
        red: [
            '#ffe0e0',
            '#ffc0c0',
            '#ffa0a0',
            '#ff8080',
            '#ff6060',
            '#ff4040',
            '#d12020',
            '#a81a1a',
            '#851515',
            '#5c0f0f'
        ],
        violet: [
            '#f0e9ff',
            '#e0d6ff',
            '#c8b5ff',
            '#ae98ff',
            '#947bff',
            '#8264e6',
            '#6f4dc2',
            '#5c369e',
            '#4a207a',
            '#380a56'
        ],
        pink: [
            '#fde7f6',
            '#facfef',
            '#f7a8e8',
            '#f482e1',
            '#f15bd9',
            '#e035c2',
            '#c21ea8',
            '#a40a8f',
            '#8b007a',
            '#6f0063'
        ]
    },
    primaryShade: 4,
    primaryColor: 'gray',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily: 'Unbounded, Vazirmatn, Apple Color Emoji, Noto Sans SC, sans-serif',
        fontWeight: '700'
    },
    defaultRadius: 'xl',
    defaultGradient: {
        from: '#909090',
        to: '#505050',
        deg: 135
    }
})
