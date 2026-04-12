import { Box, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

import { useSubscription } from '@entities/subscription-info-store'
import { formatDate } from '@shared/utils/config-parser'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-info-cards.module.css'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoCardsWidget = ({ isMobile: __ }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()

    const { user } = subscription

    const isActive = user.userStatus === 'ACTIVE'
    const statusBadgeText = isActive ? t(baseTranslations.active) : t(baseTranslations.inactive)
    const bandwidthValue =
        user.trafficLimit === '0' ? `${user.trafficUsed}/∞` : `${user.trafficUsed}/${user.trafficLimit}`

    const expiresValue = `${t(baseTranslations.expires)} ${formatDate(user.expiresAt, currentLang, baseTranslations)}`

    return (
        <Card className={classes.cardRoot} p={24} radius={12}>
            <Group justify="space-between" wrap="nowrap">
                <Stack className={classes.leftInfo} gap={12}>
                    <Box className={classes.statusBadge}>
                        <ThemeIcon
                            className={classes.statusIcon}
                            color="transparent"
                            radius="md"
                            size={24}
                            variant="transparent"
                        >
                            {isActive ? <IconCheck size={20} /> : <IconX size={20} />}
                        </ThemeIcon>
                        <Text c="white" className={classes.username} fw={500}>
                            {statusBadgeText}
                        </Text>
                    </Box>
                    <Text className={classes.expireText}>{expiresValue}</Text>
                </Stack>

                <Stack align="flex-end" gap={6} justify="flex-end" style={{ minHeight: 79 }}>
                    <Text className={classes.trafficLabel}>{t(baseTranslations.bandwidth)}:</Text>
                    <Text c="white" className={classes.trafficValue} fw={500}>
                        {bandwidthValue}
                    </Text>
                </Stack>
            </Group>
        </Card>
    )
}
