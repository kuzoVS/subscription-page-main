import { Stack, Text } from '@mantine/core'

import { getLocalizedText } from '@shared/utils/config-parser'
import { TerminalIcon } from '../cards/terminal-icon.component'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './timeline-block.module.css'

export const TimelineBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons,
    getIconFromLibrary
}: IBlockRendererProps) => {
    return (
        <Stack gap="sm" className={classes.timelineRoot}>
            {blocks.map((block, index) => {
                return (
                    <div key={index} className={classes.timelineItem}>
                        <div className={classes.timelineItemContent}>
                            <div className={classes.timelineHeader}>
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
                            </div>
                            <Stack gap="xs" style={{ marginLeft: '40px' }}>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#aaa',
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
                    </div>
                )
            })}
        </Stack>
    )
}
