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
        <div className="cardsRoot">
            {blocks.map((block, index) => {
                return (
                    <div key={index}>
                        <div style={{ display: 'flex', gap: isMobile ? '12px' : '16px', alignItems: 'flex-start' }}>
                            <TerminalIcon
                                getIconFromLibrary={getIconFromLibrary}
                                isMobile={isMobile}
                                svgIconKey={block.svgIconKey}
                                blockIndex={index}
                                variant="cards"
                            />
                            <Stack gap={isMobile ? 'xs' : 'sm'} style={{ flex: 1, minWidth: 0 }}>
                                <Text
                                    className="cardsTitle"
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                </Text>

                                <Text
                                    className="cardsDescription"
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
        </div>
    )
}
