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

    return (
        <Box
            style={{
                width: isCards ? '40px' : '40px',
                minWidth: isCards ? '40px' : 'auto',
                height: isCards ? '40px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative'
            }}
        >
            {isCards ? (
                <>
                    {/* Вертикальная линия */}
                    <Box
                        style={{
                            position: 'absolute',
                            left: '19px',
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            background: '#222'
                        }}
                    />
                    {/* Номер шага — зелёный кружок сверху */}
                    <span
                        style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '0px',
                            fontSize: '9px',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: '#000',
                            fontWeight: 700,
                            background: '#5aaa5a',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2
                        }}
                    >
                        {blockIndex + 1}
                    </span>
                    {/* Иконка — по центру, без рамки, чуть больше */}
                    <Box
                        style={{
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#0a0a0a',
                            borderRadius: '50%',
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
                    </Box>
                </>
            ) : (
                <>
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
                            background: '#0f0f0f',
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
                </>
            )}
        </Box>
    )
}
