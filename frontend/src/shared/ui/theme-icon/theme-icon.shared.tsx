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
    const backgroundColor = isCheckIcon ? 'transparent' : 'transparent';
    const borderColor = isCheckIcon ? 'none' : 'none';
    const iconColor = isCheckIcon ? '#3a6a3a' : '#ffffff'; // White icons
    const borderRadius = '0px';
    const size = isCheckIcon ? 20 : 32; // 20x20px for check icons, 32x32px for others

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
