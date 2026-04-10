import { Box } from '@mantine/core'

interface IProps {
    getIconFromLibrary: (iconKey: string) => string
    isMobile: boolean
    svgIconKey: string
    blockIndex: number
    variant?: 'cards' | 'timeline' | 'minimal' | 'accordion'
}

export const TerminalIcon = ({ getIconFromLibrary, svgIconKey, blockIndex, variant = 'cards' }: IProps) => {
    const isCards = variant === 'cards'

    if (isCards) {
        return (
            <Box
                style={{
                    width: '40px',
                    minWidth: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                }}
            >
                {/* Номер шага */}
                <div
                    style={{
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#60a5fa',
                        fontWeight: 700,
                        lineHeight: 1,
                        marginBottom: '6px'
                    }}
                >
                    {blockIndex + 1}
                </div>

                {/* Линия до иконки */}
                <div style={{ width: '1px', height: '12px', background: '#60a5fa', flexShrink: 0 }} />

                {/* Иконка — прозрачный фон */}
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        background: 'transparent',
                        flexShrink: 0
                    }}
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: getIconFromLibrary(svgIconKey)
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#60a5fa',
                            width: '20px',
                            height: '20px',
                            filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.4))'
                        }}
                    />
                </Box>

                {/* Линия после иконки — тянется до конца */}
                <div style={{ width: '1px', flex: 1, background: '#60a5fa' }} />
            </Box>
        )
    }

    return (
        <Box
            style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative'
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
                    background: '#60a5fa',
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
            <Box
                style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: '1px solid #222',
                    borderRadius: '6px'
                }}
            >
                <span
                    dangerouslySetInnerHTML={{
                        __html: getIconFromLibrary(svgIconKey)
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ccc',
                        width: '20px',
                        height: '20px',
                        filter: 'drop-shadow(0 0 3px rgba(90, 170, 90, 0.15))'
                    }}
                />
            </Box>
        </Box>
    )
}
