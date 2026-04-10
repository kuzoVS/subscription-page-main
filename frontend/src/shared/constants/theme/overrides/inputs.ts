import { InputBase, PasswordInput, Select, TextInput } from '@mantine/core'

export default {
    InputBase: InputBase.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            input: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                border: `1px solid ${theme.colors.dark[4]}`,
                color: theme.white,
                transition: 'all 0.3s ease',

                '&:focus': {
                    borderColor: theme.colors.gray[5],
                    boxShadow: `0 0 0 2px ${theme.colors.gray[8]}40`,
                    backgroundColor: 'rgba(10, 15, 26, 0.7)'
                },

                '&::placeholder': {
                    color: theme.colors.dark[3]
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            }
        })
    }),
    PasswordInput: PasswordInput.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            input: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                border: `1px solid ${theme.colors.dark[4]}`,
                color: theme.white,
                transition: 'all 0.3s ease',

                '&:focus': {
                    borderColor: theme.colors.gray[5],
                    boxShadow: `0 0 0 2px ${theme.colors.gray[8]}40`,
                    backgroundColor: 'rgba(10, 15, 26, 0.7)'
                },

                '&::placeholder': {
                    color: theme.colors.dark[3]
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            }
        })
    }),
    TextInput: TextInput.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            input: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                border: `1px solid ${theme.colors.dark[4]}`,
                color: theme.white,
                transition: 'all 0.3s ease',

                '&:focus': {
                    borderColor: theme.colors.gray[5],
                    boxShadow: `0 0 0 2px ${theme.colors.gray[8]}40`,
                    backgroundColor: 'rgba(10, 15, 26, 0.7)'
                },

                '&::placeholder': {
                    color: theme.colors.dark[3]
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            }
        })
    }),
    Select: Select.extend({
        defaultProps: {
            radius: 'xl'
        },
        styles: (theme) => ({
            input: {
                backgroundColor: 'rgba(10, 15, 26, 0.5)',
                border: `1px solid ${theme.colors.dark[4]}`,
                color: theme.white,
                transition: 'all 0.3s ease',

                '&:focus': {
                    borderColor: theme.colors.gray[5],
                    boxShadow: `0 0 0 2px ${theme.colors.gray[8]}40`,
                    backgroundColor: 'rgba(10, 15, 26, 0.7)'
                },

                '&::placeholder': {
                    color: theme.colors.dark[3]
                },

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }
            },
            dropdown: {
                backgroundColor: theme.colors.dark[8],
                border: `1px solid ${theme.colors.dark[6]}`,
                borderRadius: theme.radius.xl
            },
            item: {
                '&[data-hovered]': {
                    backgroundColor: theme.colors.gray[8] + '30'
                },
                '&[data-selected]': {
                    backgroundColor: theme.colors.gray[7] + '50'
                }
            }
        })
    })
}
