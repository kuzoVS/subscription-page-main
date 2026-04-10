import { Stack, Text } from '@mantine/core'

import { getLocalizedText } from '@shared/utils/config-parser'
import { TerminalIcon } from './terminal-icon.component'

import { IBlockRendererProps } from '../renderer-block.interface'

export const CardsBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons,
    getIconFromLibrary
}: IBlockRendererProps) => {
    return (
        <Stack gap="sm">
            {blocks.map((block, index) => {
                return (
                    <div
                        key={index}
                        style={{ display: 'flex', borderBottom: '1px solid #111', paddingBottom: '14px', paddingTop: '14px', position: 'relative' }}
                    >
                        <TerminalIcon
                            getIconFromLibrary={getIconFromLibrary}
                            isMobile={isMobile}
                            svgIconKey={block.svgIconKey}
                            blockIndex={index}
                            variant="cards"
                        />
                        <Stack gap={isMobile ? 'xs' : 'sm'} style={{ flex: 1, minWidth: 0, paddingTop: '12px' }}>
                            <Text
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: isMobile ? '12px' : '13px',
                                    fontWeight: 500,
                                    color: '#5aaa5a',
                                    wordBreak: 'break-word'
                                }}
                            >
                                <span style={{ color: '#666' }}>{'→ '}</span>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: getLocalizedText(block.title, currentLang)
                                    }}
                                />
                            </Text>

                            <Text
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: isMobile ? '11px' : '12px',
                                    color: '#bbb',
                                    whiteSpace: 'pre-line',
                                    lineHeight: 1.6
                                }}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: getLocalizedText(block.description, currentLang)
                                    }}
                                />
                            </Text>

                            {renderBlockButtons(block.buttons)}
                        </Stack>
                    </div>
                )
            })}
        </Stack>
    )
}
