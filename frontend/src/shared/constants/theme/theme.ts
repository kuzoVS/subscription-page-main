import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontFamilyMonospace: "'SF Mono', 'Fira Code', monospace",
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
    black: '#1a1a1a',
    colors: {
        dark: [
            '#f9fafb',
            '#f3f4f6',
            '#e5e7eb',
            '#d1d5db',
            '#9ca3af',
            '#6b7280',
            '#4b5563',
            '#374151',
            '#1f2937',
            '#111827'
        ],
        gray: [
            '#f9fafb',
            '#f3f4f6',
            '#e5e7eb',
            '#d1d5db',
            '#9ca3af',
            '#6b7280',
            '#4b5563',
            '#374151',
            '#1f2937',
            '#111827'
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
        ]
    },
    primaryShade: 6,
    primaryColor: 'blue',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        fontWeight: '700'
    },
    defaultRadius: 'md',
    defaultGradient: {
        from: '#3b82f6',
        to: '#3b82f6',
        deg: 0
    }
})
