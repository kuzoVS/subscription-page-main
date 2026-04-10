import {
    IconAlertCircle,
    IconArrowsUpDown,
    IconCalendar,
    IconCheck,
    IconChevronDown,
    IconUserScan,
    IconX
} from '@tabler/icons-react'
import {
    Card,
    Collapse,
    Group,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton
} from '@mantine/core'
import { useState } from 'react'

import {
    formatDate,
    getExpirationTextUtil
} from '@shared/utils/config-parser'
import { InfoBlockShared } from '@shared/ui/info-block/info-block.shared'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoCollapsedMinimalDarkWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const [isExpanded] = useState(false) // Removed expand/collapse functionality for minimal design

    const { user } = subscription

    const getStatusColor = () => {
        if (user.userStatus === 'ACTIVE' && user.daysLeft > 3) {
            return 'gray'
        }
        if (user.userStatus === 'ACTIVE' && user.daysLeft > 0) {
            return 'gray'
        }
        return 'gray'
    }

    const statusColor = getStatusColor()

    return (
        <Card p="sm" radius="sm" bg="#111111" style={{ border: 'none' }}>
            <Group gap="sm" justify="space-between" wrap="nowrap">
                <Group gap="xs" style={{ minWidth: 0, flex: 1 }} wrap="nowrap">
                    <ThemeIcon
                        color="gray"
                        radius="md"
                        size={isMobile ? 28 : 32}
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid #333333',
                            flexShrink: 0
                        }}
                        variant="light"
                    >
                        {user.userStatus === 'ACTIVE' ? <IconCheck size={14} /> : <IconX size={14} />}
                    </ThemeIcon>

                    <Stack gap={0} style={{ minWidth: 0, flex: 1 }}>
                        <Text
                            c="white"
                            fw={500}
                            size={isMobile ? 'sm' : 'md'}
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {user.username}
                        </Text>
                        <Text c="dimmed" size="xs" style={{ whiteSpace: 'nowrap' }}>
                            {getExpirationTextUtil(
                                user.expiresAt,
                                currentLang,
                                baseTranslations
                            )}
                        </Text>
                    </Stack>
                </Group>
            </Group>
        </Card>
    )
}