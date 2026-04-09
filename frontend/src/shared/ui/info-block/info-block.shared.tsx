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
                            background: '#1a1a1a',
                            border: '1px solid #333333',
                        }}>
                        {icon}
                    </ThemeIcon>
                    <Text c="dimmed" fw={400} size="xs" truncate style={{textTransform: 'lowercase'}}>
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
