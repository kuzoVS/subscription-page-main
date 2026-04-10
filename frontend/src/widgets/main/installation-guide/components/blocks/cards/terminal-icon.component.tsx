import { Box } from '@mantine/core'

interface IProps {
    getIconFromLibrary: (iconKey: string) => string
    isMobile: boolean
    svgIconKey: string
    blockIndex: number
}

export const TerminalIcon = ({ getIconFromLibrary, svgIconKey, blockIndex }: IProps) => {
    const isCheckIcon = svgIconKey.toLowerCase().includes('check')

    return (
        <Box
            style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '0.5px solid #1a1a1a',
                background: '#0a0a0a',
                position: 'relative'
            }}
        >
            {/* Step number */}
            <span
                style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '-4px',
                    fontSize: '9px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#3a6a3a',
                    fontWeight: 600,
                    background: '#000',
                    padding: '0 2px'
                }}
            >
                {blockIndex + 1}
            </span>

            <span
                dangerouslySetInnerHTML={{
                    __html: getIconFromLibrary(svgIconKey)
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isCheckIcon ? '#3a6a3a' : '#555',
                    width: '14px',
                    height: '14px'
                }}
            />
        </Box>
    )
}
