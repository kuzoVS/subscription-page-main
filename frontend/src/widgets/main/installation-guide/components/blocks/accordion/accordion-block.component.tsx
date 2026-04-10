import { Accordion, Group, Stack, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

import { getLocalizedText } from '@shared/utils/config-parser'
import { vibrate } from '@shared/utils/vibrate'
import { TerminalIcon } from '../cards/terminal-icon.component'

import { IBlockRendererProps } from '../renderer-block.interface'
import classes from './accordion-block.module.css'

export const AccordionBlockRenderer = ({
    blocks,
    isMobile,
    currentLang,
    renderBlockButtons,
    getIconFromLibrary
}: IBlockRendererProps) => {
    const [openedAccordion, setOpenedAccordion] = useState<null | string>('0')

    return (
        <Accordion
            chevron={<IconChevronDown size={14} style={{ color: '#444' }} />}
            classNames={{
                item: classes.accordionItem,
                control: classes.accordionControl,
                chevron: classes.accordionChevron,
                content: classes.accordionContent,
                label: classes.accordionLabel
            }}
            onChange={(value) => {
                vibrate('tap')
                setOpenedAccordion(value)
            }}
            radius={0}
            transitionDuration={150}
            value={openedAccordion}
            variant="separated"
        >
            {blocks.map((block, index) => {
                return (
                    <Accordion.Item key={index} value={String(index)}>
                        <Accordion.Control>
                            <Group gap="sm" wrap="nowrap">
                                <TerminalIcon
                                    getIconFromLibrary={getIconFromLibrary}
                                    isMobile={isMobile}
                                    svgIconKey={block.svgIconKey}
                                    blockIndex={index}
                                />
                                <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
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
                                </Stack>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
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
                            <Group gap="xs" mt="sm" wrap="wrap">
                                {renderBlockButtons(block.buttons)}
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}
