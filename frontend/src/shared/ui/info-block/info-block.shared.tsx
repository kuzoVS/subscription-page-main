import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import clsx from 'clsx'

import { IInfoBlockProps } from './interfaces/props.interface'
import classes from './info-block.module.css'

export const InfoBlockShared = ({ color, icon, title, value }: IInfoBlockProps) => {
    return (
        <Box className={classes.infoBlock}>
            <Stack gap={4}>
                <Group gap={4} wrap="nowrap">
                    <ThemeIcon color="gray" radius="sm" size="xs" variant="light"
                        style={{
                            background: '#16162e',
                            border: '0.5px solid #2a2a50',
                        }}>
                        {icon}
                    </ThemeIcon>
                    <Text c="#5a5a80" fw={400} size="xs" truncate style={{textTransform: 'lowercase'}}>
                        {title}
                    </Text>
                </Group>
                <Text c="white" fw={500} size="sm" truncate>
                    {value}
                </Text>
            </Stack>
        </Box>
    )
}
