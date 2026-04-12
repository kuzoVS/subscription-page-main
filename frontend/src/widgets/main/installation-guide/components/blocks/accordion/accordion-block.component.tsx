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
            chevron={<IconChevronDown size={18} style={{ color: '#64748b' }} />}
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
            radius="lg"
            transitionDuration={200}
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
                                    variant="accordion"
                                />
                                <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
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
                                </Stack>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
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
                            <Group gap="xs" mt="md" wrap="wrap">
                                {renderBlockButtons(block.buttons)}
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}
