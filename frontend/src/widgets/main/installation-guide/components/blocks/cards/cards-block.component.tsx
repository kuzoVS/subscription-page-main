import { Group, Stack, Text, Paper } from '@mantine/core'

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
        <Stack gap="md">
            {blocks.map((block, index) => {
                return (
                    <Paper
                        key={index}
                        radius="lg"
                        withBorder
                        style={{
                            padding: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            background: 'rgba(15, 23, 42, 0.5)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            transition: 'all 0.25s ease',
                            animation: 'fade-in 0.4s ease-out'
                        }}
                    >
                        <Group gap="md" wrap="nowrap" align="start">
                            <TerminalIcon
                                getIconFromLibrary={getIconFromLibrary}
                                isMobile={isMobile}
                                svgIconKey={block.svgIconKey}
                                blockIndex={index}
                                variant="cards"
                            />
                            <Stack gap={isMobile ? 'xs' : 'sm'} style={{ flex: 1, minWidth: 0, paddingTop: '4px' }}>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: isMobile ? '14px' : '16px',
                                        fontWeight: 600,
                                        color: '#f8fafc',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#94a3b8',
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
                        </Group>
                    </Paper>
                )
            })}
        </Stack>
    )
}
