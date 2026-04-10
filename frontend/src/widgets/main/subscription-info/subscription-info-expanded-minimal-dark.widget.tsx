import {
    IconAlertCircle,
    IconArrowsUpDown,
    IconCalendar,
    IconCheck,
    IconUserScan,
    IconX
} from '@tabler/icons-react'
import { Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'

import {
    formatDate,
    getExpirationTextUtil
} from '@shared/utils/config-parser'
import { InfoBlockShared } from '@shared/ui/info-block/info-block.shared'
import { useSubscription } from '@entities/subscription-info-store'
import { useTranslation } from '@shared/hooks'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoExpandedMinimalDarkWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()

    const { user } = subscription

    const getStatusColor = () => {
        if (user.userStatus === 'ACTIVE' && user.daysLeft > 0) {
            return 'gray'
        }
        if (
            (user.userStatus === 'ACTIVE' && user.daysLeft === 0) ||
            (user.daysLeft >= 0 && user.daysLeft <= 3)
        ) {
            return 'gray'
        }
        return 'gray'
    }

    const statusColor = getStatusColor()

    return (
        <Card p={{ base: 'sm', xs: 'sm', sm: 'md', md: 'md' }} radius="sm" bg="#111111" style={{ border: 'none' }}>
            <Stack gap={isMobile ? 'sm' : 'md'}>
                <Group gap="sm" justify="space-between">
                    <Group
                        gap={isMobile ? 'xs' : 'sm'}
                        style={{ minWidth: 0, flex: 1 }}
                        wrap="nowrap"
                    >
                        <ThemeIcon
                            color="gray"
                            radius="sm"
                            size={isMobile ? 36 : 44}
                            style={{
                                background: '#1a1a1a',
                                border: '1px solid #333333',
                                flexShrink: 0
                            }}
                            variant="light"
                        >
                            {user.userStatus === 'ACTIVE' ? <IconCheck size={isMobile ? 18 : 22} /> : <IconX size={isMobile ? 18 : 22} />}
                        </ThemeIcon>

                        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                            <Title
                                c="white"
                                fw={500}
                                order={5}
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {user.username}
                            </Title>
                            <Text
                                c="dimmed"
                                fw={500}
                                size={isMobile ? 'xs' : 'sm'}
                            >
                                {getExpirationTextUtil(
                                    user.expiresAt,
                                    currentLang,
                                    baseTranslations
                                )}
                            </Text>
                        </Stack>
                    </Group>
                </Group>

                <SimpleGrid cols={{ base: 1, xs: 1, sm: 2 }} spacing="xs" verticalSpacing="xs">
                    <InfoBlockShared
                        color="gray"
                        icon={<IconUserScan size={16} />}
                        title={t(baseTranslations.name)}
                        value={user.username}
                    />

                    <InfoBlockShared
                        color="gray"
                        icon={
                            user.userStatus === 'ACTIVE' ? (
                                <IconCheck size={16} />
                            ) : (
                                <IconX size={16} />
                            )
                        }
                        title={t(baseTranslations.status)}
                        value={
                            user.userStatus === 'ACTIVE'
                                ? t(baseTranslations.active)
                                : t(baseTranslations.inactive)
                        }
                    />

                    <InfoBlockShared
                        color="gray"
                        icon={<IconCalendar size={16} />}
                        title={t(baseTranslations.expires)}
                        value={formatDate(user.expiresAt, currentLang, baseTranslations)}
                    />

                    <InfoBlockShared
                        color="gray"
                        icon={<IconArrowsUpDown size={16} />}
                        title={t(baseTranslations.bandwidth)}
                        value={`${user.trafficUsed} / ${user.trafficLimit === '0' ? '∞' : user.trafficLimit}`}
                    />
                </SimpleGrid>
            </Stack>
        </Card>
    )
}