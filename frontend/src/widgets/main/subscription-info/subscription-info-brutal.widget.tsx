import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { Collapse, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { useState } from 'react'

import {
    formatDate,
    getExpirationTextUtil
} from '@shared/utils/config-parser'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-info-brutal.module.css'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoBrutalWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const [isExpanded, setIsExpanded] = useState(false)

    const { user } = subscription

    const isActive = user.userStatus === 'ACTIVE' && user.daysLeft > 0
    const isExpiringSoon = user.userStatus === 'ACTIVE' && user.daysLeft >= 0 && user.daysLeft <= 3

    const statusText = isActive
        ? t(baseTranslations.active)
        : isExpiringSoon
            ? t(baseTranslations.active)
            : t(baseTranslations.inactive)

    const handleToggle = () => {
        vibrate('tap')
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={classes.cardRoot}>
            <UnstyledButton onClick={handleToggle} className={classes.header}>
                <Group justify="space-between" wrap="nowrap" style={{ width: '100%' }}>
                    <div className={classes.leftInfo}>
                        <div className={classes.statusBadge}>
                            {isActive || isExpiringSoon ? '✓' : '✗'} {statusText}
                        </div>
                        <Text
                            style={{
                                fontSize: '15px',
                                color: '#ffffff',
                                opacity: 0.7,
                                marginTop: '10px'
                            }}
                        >
                            {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                        </Text>
                    </div>

                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0, minHeight: '70px' }} align="flex-end">
                        <Stack gap={4} style={{ alignItems: 'flex-end' }}>
                            <Text
                                style={{
                                    fontSize: '13px',
                                    color: '#ffffff',
                                    opacity: 0.5
                                }}
                            >
                                Трафик
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}
                            >
                                {user.trafficUsed} / {user.trafficLimit === '0' ? '∞' : user.trafficLimit}
                            </Text>
                        </Stack>
                        {isExpanded ? (
                            <IconChevronUp size={20} style={{ color: '#6b6b80', marginLeft: '8px' }} />
                        ) : (
                            <IconChevronDown size={20} style={{ color: '#6b6b80', marginLeft: '8px' }} />
                        )}
                    </Group>
                </Group>
            </UnstyledButton>

            <Collapse in={isExpanded}>
                <div className={classes.expandedContent}>
                    <div className={classes.fieldsGrid}>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#6b6b80',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}
                            >
                                Имя
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: '#5b8def'
                                }}
                            >
                                {user.username}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#6b6b80',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}
                            >
                                Статус
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: isActive || isExpiringSoon ? '#3dd9b0' : '#ef4444'
                                }}
                            >
                                {statusText}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#6b6b80',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}
                            >
                                Истекает
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}
                            >
                                {formatDate(user.expiresAt, currentLang, baseTranslations)}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '12px',
                                    color: '#6b6b80',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}
                            >
                                Трафик
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: '#ffffff'
                                }}
                            >
                                {user.trafficUsed} / {user.trafficLimit === '0' ? '∞' : user.trafficLimit}
                            </Text>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}
