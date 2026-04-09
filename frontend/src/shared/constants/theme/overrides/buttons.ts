import { ActionIcon, Button } from '@mantine/core'

export default {
    ActionIcon: ActionIcon.extend({
        defaultProps: {
            radius: 'xl',
            variant: 'gradient',
            gradient: { from: '#06b6d4', to: '#22d3ee', deg: 135 }
        },
        styles: (theme) => ({
            root: {
                background: 'transparent',
                border: `1px solid ${theme.colors.cyan[6]}`,
                transition: 'all 0.3s ease',

                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 16px ${theme.colors.cyan[8]}40`,
                    background: `linear-gradient(135deg, ${theme.colors.cyan[7]}, ${theme.colors.cyan[5]})`
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            }
        })
    }),
    Button: Button.extend({
        defaultProps: {
            radius: 'xl',
            variant: 'gradient',
            gradient: { from: '#06b6d4', to: '#22d3ee', deg: 135 }
        },
        styles: (theme) => ({
            root: {
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                fontSize: theme.fontSizes.sm,
                paddingInline: '1.5rem',
                transition: 'all 0.3s ease',
                border: 'none',

                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${theme.colors.cyan[8]}50`,
                    background: `linear-gradient(135deg, ${theme.colors.cyan[6]}, ${theme.colors.cyan[4]})`
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            },

            // Secondary variant
            '&[data-variant="outline"]': {
                background: 'transparent',
                border: `1px solid ${theme.colors.cyan[5]}`,

                '&:hover': {
                    background: `linear-gradient(135deg, ${theme.colors.cyan[8]}20, ${theme.colors.cyan[6]}20)`
                }
            },

            // Subtle variant
            '&[data-variant="subtle"]': {
                background: `linear-gradient(135deg, ${theme.colors.cyan[8]}20, ${theme.colors.cyan[6]}10)`,
                border: `1px solid ${theme.colors.cyan[7]}30`,

                '&:hover': {
                    background: `linear-gradient(135deg, ${theme.colors.cyan[8]}30, ${theme.colors.cyan[6]}20)`
                }
            }
        })
    })
}
