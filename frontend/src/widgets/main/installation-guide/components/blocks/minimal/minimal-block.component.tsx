import { Box, Group, Stack, Text } from '@mantine/core'

import { getColorGradient, getLocalizedText } from '@shared/utils/config-parser'
import { ThemeIconShared } from '@shared/ui'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './minimal-block.module.css'

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
                const gradientStyle = getColorGradient(block.svgIconColor)
                const forcedIconKey =
                    index === 0 ? 'download' : index === 1 ? 'cloud-download' : 'check'

                return (
                    <Box className={classes.stepCard} key={index}>
                        <Group className={classes.stepHeader} gap="md" wrap="nowrap">
                            <ThemeIconShared
                                getIconFromLibrary={getIconFromLibrary}
                                gradientStyle={gradientStyle}
                                isMobile={isMobile}
                                svgIconColor={block.svgIconColor}
                                svgIconKey={forcedIconKey}
                            />
                            <Stack className={classes.stepTextContent} gap={6}>
                                <Text
                                    c="white"
                                    className={classes.stepTitle}
                                    dangerouslySetInnerHTML={{
                                        __html: getLocalizedText(block.title, currentLang)
                                    }}
                                    fw={400}
                                    size="sm"
                                />
                                <Text
                                    className={classes.stepDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: getLocalizedText(block.description, currentLang)
                                    }}
                                    size="xs"
                                />
                            </Stack>
                        </Group>
                        {block.buttons.length > 0 && (
                            <Box className={classes.stepButtonWrapper}>
                                {renderBlockButtons(block.buttons, 'subtle')}
                            </Box>
                        )}
                    </Box>
                )
            })}
        </Stack>
    )
}
