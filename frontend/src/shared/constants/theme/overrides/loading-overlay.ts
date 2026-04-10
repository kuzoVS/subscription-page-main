import { LoadingOverlay } from '@mantine/core'

export default {
    LoadingOverlay: LoadingOverlay.extend({
        defaultProps: {
            zIndex: 1000,
            overlayProps: {
                radius: 'lg',
                blur: 6,
                backgroundOpacity: 0.7,
                color: '#0a0f1a'
            },
            loaderProps: {
                color: 'gray',
                size: 'lg'
            }
        },
        styles: (theme) => ({
            root: {
                '& .mantine-LoadingOverlay-overlay': {
                    background: `radial-gradient(circle, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[9]} 100%)`,
                    backdropFilter: 'blur(8px)',
                    '-webkit-backdrop-filter': 'blur(8px)'
                }
            }
        })
    })
}
