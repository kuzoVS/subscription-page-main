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
                    height: '100%',
                    position: 'relative',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Вертикальная линия через весь блок, цвет иконки */}
                <div
                    style={{
                        position: 'absolute',
                        left: '19px',
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        background: '#5aaa5a'
                    }}
                />
                {/* Номер шага — просто текст на линии */}
                <div
                    style={{
                        position: 'absolute',
                        top: '4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#5aaa5a',
                        fontWeight: 700,
                        lineHeight: 1,
                        zIndex: 2
                    }}
                >
                    {blockIndex + 1}
                </div>
                {/* Иконка — ниже, по центру линии */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
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
                            color: '#5aaa5a',
                            width: '20px',
                            height: '20px',
                            filter: 'drop-shadow(0 0 4px rgba(90, 170, 90, 0.3))'
                        }}
                    />
                </div>
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
