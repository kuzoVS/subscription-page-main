import { ThemeIcon } from '@mantine/core'

interface IProps {
    children: React.ReactNode
}

export const MinimalThemeIcon = (props: IProps) => {
    return (
        <ThemeIcon
            color="gray"
            radius="sm"
            size={32}
            style={{
                background: '#1a1a1a',
                border: '1px solid #333333',
                flexShrink: 0
            }}
            variant="light"
        >
            {props.children}
        </ThemeIcon>
    )
}