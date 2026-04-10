import { Box, Group, Stack, Text } from '@mantine/core'

import { getLocalizedText } from '@shared/utils/config-parser'
import { TerminalIcon } from '../cards/terminal-icon.component'

import { IBlockRendererProps } from '../renderer-block.interface'

export const MinimalBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons,
    getIconFromLibrary
}: IBlockRendererProps) => {
    return (
        <Stack gap="md">
            {blocks.map((block, index) => {
                return (
                    <Box key={index} style={{
                        padding: '12px 0 12px 14px',
                        borderBottom: '1px solid #111',
                        borderLeft: '2px solid #3a6a3a',
                        background: 'transparent',
                        position: 'relative'
                    }}>
                        <Group gap="sm" mb="xs" wrap="nowrap">
                            <TerminalIcon
                                getIconFromLibrary={getIconFromLibrary}
                                isMobile={isMobile}
                                svgIconKey={block.svgIconKey}
                                blockIndex={index}
                            />
                            <Text
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: isMobile ? '12px' : '13px',
                                    fontWeight: 500,
                                    color: '#5aaa5a'
                                }}
                            >
                                <span style={{ color: '#666' }}>{'→ '}</span>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: getLocalizedText(block.title, currentLang)
                                    }}
                                />
                            </Text>
                        </Group>
                        <Text
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: isMobile ? '11px' : '12px',
                                color: '#bbb',
                                lineHeight: 1.6
                            }}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: getLocalizedText(block.description, currentLang)
                                }}
                            />
                        </Text>
                        {block.buttons.length > 0 && (
                            <Box style={{ marginTop: 8 }}>
                                {renderBlockButtons(block.buttons)}
                            </Box>
                        )}
                    </Box>
                )
            })}
        </Stack>
    )
}
