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
                width: isCards ? '2px' : '40px',
                height: isCards ? 'auto' : '40px',
                display: 'flex',
                alignItems: isCards ? 'flex-start' : 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative'
            }}
        >
            {isCards ? (
                <>
                    {/* Номер шага — зелёный кружок сверху на линии */}
                    <span
                        style={{
                            position: 'absolute',
                            top: '-2px',
                            left: '-7px',
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
                    {/* Иконка — по центру линии, без рамки */}
                    <span
                        dangerouslySetInnerHTML={{
                            __html: getIconFromLibrary(svgIconKey)
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#5aaa5a',
                            width: '18px',
                            height: '18px',
                            marginLeft: '-8px',
                            filter: 'drop-shadow(0 0 4px rgba(90, 170, 90, 0.3))'
                        }}
                    />
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
