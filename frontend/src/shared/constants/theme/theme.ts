import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontFamilyMonospace: "'JetBrains Mono', 'Fira Mono', monospace",
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
    black: '#0a0e17',
    colors: {
        dark: [
            '#f8fafc',
            '#f1f5f9',
            '#e2e8f0',
            '#cbd5e1',
            '#94a3b8',
            '#64748b',
            '#475569',
            '#334155',
            '#1e293b',
            '#0f172a'
        ],
        gray: [
            '#f8fafc',
            '#f1f5f9',
            '#e2e8f0',
            '#cbd5e1',
            '#94a3b8',
            '#64748b',
            '#475569',
            '#334155',
            '#1e293b',
            '#0f172a'
        ],
        blue: [
            '#eff6ff',
            '#dbeafe',
            '#bfdbfe',
            '#93c5fd',
            '#60a5fa',
            '#3b82f6',
            '#2563eb',
            '#1d4ed8',
            '#1e40af',
            '#1e3a8a'
        ],
        green: [
            '#ecfdf5',
            '#d1fae5',
            '#a7f3d0',
            '#6ee7b7',
            '#34d399',
            '#10b981',
            '#059669',
            '#047857',
            '#065f46',
            '#064e3b'
        ],
        yellow: [
            '#fefce8',
            '#fef9c3',
            '#fef08a',
            '#fde047',
            '#facc15',
            '#eab308',
            '#ca8a04',
            '#a16207',
            '#854d0e',
            '#713f12'
        ],
        orange: [
            '#fff7ed',
            '#ffedd5',
            '#fed7aa',
            '#fdba74',
            '#fb923c',
            '#f97316',
            '#ea580c',
            '#c2410c',
            '#9a3412',
            '#7c2d12'
        ],
        red: [
            '#fef2f2',
            '#fee2e2',
            '#fecaca',
            '#fca5a5',
            '#f87171',
            '#ef4444',
            '#dc2626',
            '#b91c1c',
            '#991b1b',
            '#7f1d1d'
        ],
        violet: [
            '#f5f3ff',
            '#ede9fe',
            '#ddd6fe',
            '#c4b5fd',
            '#a78bfa',
            '#8b5cf6',
            '#7c3aed',
            '#6d28d9',
            '#5b21b6',
            '#4c1d95'
        ],
        pink: [
            '#fdf2f8',
            '#fce7f3',
            '#fbcfe8',
            '#f9a8d4',
            '#f472b6',
            '#ec4899',
            '#db2777',
            '#be185d',
            '#9d174d',
            '#831843'
        ],
        teal: [
            '#f0fdfa',
            '#ccfbf1',
            '#99f6e4',
            '#5eead4',
            '#2dd4bf',
            '#14b8a6',
            '#0d9488',
            '#0f766e',
            '#115e59',
            '#134e4a'
        ]
    },
    primaryShade: 5,
    primaryColor: 'blue',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        fontWeight: '600'
    },
    defaultRadius: 'lg',
    defaultGradient: {
        from: '#3b82f6',
        to: '#10b981',
        deg: 135
    }
})
