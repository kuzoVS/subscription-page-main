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
                        padding: '12px 14px',
                        border: '0.5px solid #1a1a1a',
                        borderLeft: '2px solid #3a6a3a',
                        background: '#0a0a0a'
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
                                    color: '#3a6a3a'
                                }}
                            >
                                <span style={{ color: '#555' }}>{'→ '}</span>
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
                                color: '#888',
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
