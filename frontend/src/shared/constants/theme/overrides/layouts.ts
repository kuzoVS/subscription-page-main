import { Paper } from '@mantine/core'

export default {
    Paper: Paper.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            root: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                backgroundImage: 'radial-gradient(ellipse at center, rgba(107, 114, 128, 0.05) 0%, transparent 70%)',
                border: `1px solid ${theme.colors.dark[6]}`,
                transition: 'all 0.3s ease',

                '&:hover:not(:disabled)': {
                    borderColor: theme.colors.gray[6],
                    boxShadow: `0 8px 24px ${theme.colors.gray[8]}20`
                }
            }
        })
    })
}
