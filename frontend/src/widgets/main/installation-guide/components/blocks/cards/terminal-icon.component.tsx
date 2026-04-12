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
                    width: '48px',
                    minWidth: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                }}
            >
                {/* Номер шага */}
                <div
                    style={{
                        fontSize: '12px',
                        fontFamily: "'Inter', sans-serif",
                        color: '#60a5fa',
                        fontWeight: 700,
                        lineHeight: 1,
                        marginBottom: '8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {blockIndex + 1}
                </div>

                {/* Линия до иконки */}
                <div style={{ width: '2px', height: '12px', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.6))', flexShrink: 0, borderRadius: '1px' }} />

                {/* Иконка */}
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
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
                            height: '20px'
                        }}
                    />
                </Box>

                {/* Линия после иконки — тянется до конца */}
                <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.1))', borderRadius: '1px' }} />
            </Box>
        )
    }

    return (
        <Box
            style={{
                width: '48px',
                height: '48px',
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
                    top: '-4px',
                    right: '-4px',
                    fontSize: '10px',
                    fontFamily: "'Inter', sans-serif",
                    color: '#fff',
                    fontWeight: 700,
                    background: '#3b82f6',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
                }}
            >
                {blockIndex + 1}
            </span>
            <Box
                style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '12px'
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
                        color: '#94a3b8',
                        width: '24px',
                        height: '24px'
                    }}
                />
            </Box>
        </Box>
    )
}
