import { ThemeIcon } from '@mantine/core'

interface IProps {
    getIconFromLibrary: (iconKey: string) => string
    isMobile: boolean
    svgIconColor: string
    svgIconKey: string
}
export const ThemeIconShared = (props: IProps) => {
    const { isMobile, svgIconKey, getIconFromLibrary } = props

    // Determine if this is a "Check" icon for special styling
    const isCheckIcon = svgIconKey.toLowerCase().includes('check');

    // Define styles based on whether it's a check icon
    const backgroundColor = isCheckIcon ? '#1a1a1a' : '#1a1a1a';
    const borderColor = isCheckIcon ? '0.5px solid #444444' : '0.5px solid #333333';
    const iconColor = isCheckIcon ? '#ffffff' : '#666666';
    const borderRadius = '8px';
    const size = 36; // Fixed size of 36x36px

    return (
        <ThemeIcon
            color="gray"
            radius="sm"
            size={size}
            style={{
                background: backgroundColor,
                border: borderColor,
                flexShrink: 0,
                borderRadius: borderRadius
            }}
            variant="light"
        >
            <span
                dangerouslySetInnerHTML={{
                    __html: getIconFromLibrary(svgIconKey)
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: iconColor
                }}
            />
        </ThemeIcon>
    )
}
