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
        <Stack gap="md" className={classes.timelineRoot}>
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
                                    variant="timeline"
                                />
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: isMobile ? '14px' : '15px',
                                        fontWeight: 600,
                                        color: '#f8fafc'
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                </Text>
                            </div>
                            <Stack gap="xs" style={{ marginLeft: '48px' }}>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#94a3b8',
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
