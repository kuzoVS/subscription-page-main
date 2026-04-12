import { Group, Stack, Text, ThemeIcon } from '@mantine/core'

import { getLocalizedText } from '@shared/utils/config-parser'
import { getColorGradient } from '@shared/utils/config-parser/color-parser.util'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './cards-block.module.css'

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
                const iconKey = block.svgIconKey || 'DownloadIcon'
                const gradientStyle = getColorGradient('cyan')

                return (
                    <div key={index} className={classes.stepCard}>
                        <div className={classes.stepHeader}>
                            <ThemeIcon
                                size={isMobile ? 36 : 42}
                                radius="lg"
                                style={{
                                    background: gradientStyle.background,
                                    border: gradientStyle.border,
                                    flexShrink: 0
                                }}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: getIconFromLibrary(iconKey)
                                    }}
                                    style={{
                                        display: 'flex',
                                        width: '20px',
                                        height: '20px',
                                        color: '#ffffff'
                                    }}
                                />
                            </ThemeIcon>
                            <Stack gap={6} style={{ flex: 1, minWidth: 0 }}>
                                <Text className={classes.stepTitle}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                </Text>
                                <Text className={classes.stepDescription}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.description, currentLang)
                                        }}
                                    />
                                </Text>
                            </Stack>
                        </div>

                        {renderBlockButtons(block.buttons)}
                    </div>
                )
            })}
        </Stack>
    )
}
