import { Paper } from '@mantine/core'

export default {
    Paper: Paper.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            root: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                backgroundImage: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
                border: `1px solid ${theme.colors.dark[6]}`,
                transition: 'all 0.3s ease',

                '&:hover:not(:disabled)': {
                    borderColor: theme.colors.cyan[6],
                    boxShadow: `0 8px 24px ${theme.colors.cyan[8]}20`
                }
            }
        })
    })
}
