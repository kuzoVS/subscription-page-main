import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import clsx from 'clsx'

import { IInfoBlockProps } from './interfaces/props.interface'
import classes from './info-block.module.css'

export const InfoBlockShared = ({ color, icon, title, value }: IInfoBlockProps) => {
    return (
        <Box className={classes.infoBlock}>
            <Stack gap={4}>
                <Group gap={4} wrap="nowrap">
                    <ThemeIcon color="gray" radius="sm" size={20} variant="light"
                        style={{
                            background: '#0a0a0a',
                            border: '0.5px solid #222',
                        }}>
                        {icon}
                    </ThemeIcon>
                    <Text c="#333" fw={400} size="11px" truncate style={{textTransform: 'lowercase', fontSize: '0.6875rem'}}>
                        {title}
                    </Text>
                </Group>
                <Text c="white" fw={500} size="14px" truncate style={{fontSize: '0.875rem'}}>
                    {value}
                </Text>
            </Stack>
        </Box>
    )
}
