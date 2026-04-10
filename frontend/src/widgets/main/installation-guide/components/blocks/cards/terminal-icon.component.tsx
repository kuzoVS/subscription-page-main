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
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                background: '#0f0f0f',
                border: '1px solid #222',
                borderRadius: '6px'
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    fontSize: '8px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#000',
                    fontWeight: 700,
                    background: '#5aaa5a',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                    justifyContent: 'center',
                    color: isCheckIcon ? '#5aaa5a' : '#ccc',
                    width: '20px',
                    height: '20px',
                    filter: 'drop-shadow(0 0 3px rgba(90, 170, 90, 0.15))'
                }}
            />
        </Box>
    )
}
