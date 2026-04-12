import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { Collapse, Group, Stack, Text, UnstyledButton, Badge } from '@mantine/core'
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
        <div className={classes.wrapper}>
            <UnstyledButton onClick={handleToggle} className={classes.header}>
                <Group gap="md" wrap="nowrap" style={{ width: '100%' }}>
                    <div
                        className={classes.statusDot}
                        style={{
                            background: isActive || isExpiringSoon ? '#10b981' : '#ef4444'
                        }}
                    />

                    <Stack gap={4} style={{ minWidth: 0, flex: 1 }}>
                        <Text
                            style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: '#ffffff',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {user.username}
                        </Text>
                        <Text
                            style={{
                                fontSize: '13px',
                                color: '#888888'
                            }}
                        >
                            {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                        </Text>
                    </Stack>

                    <Group gap="sm" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Badge
                            color={isActive || isExpiringSoon ? 'green' : 'red'}
                            size="md"
                            styles={{
                                root: {
                                    borderRadius: '16px',
                                    padding: '6px 14px',
                                    fontWeight: 600,
                                    background: isActive || isExpiringSoon ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    color: isActive || isExpiringSoon ? '#10b981' : '#ef4444',
                                    border: 'none'
                                }
                            }}
                        >
                            {statusText}
                        </Badge>
                        {isExpanded ? (
                            <IconChevronUp size={18} style={{ color: '#666666' }} />
                        ) : (
                            <IconChevronDown size={18} style={{ color: '#666666' }} />
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
                                    fontSize: '11px',
                                    color: '#666666',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 600,
                                    marginBottom: '8px'
                                }}
                            >
                                Status
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: isActive || isExpiringSoon ? '#10b981' : '#ef4444'
                                }}
                            >
                                {statusText}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '11px',
                                    color: '#666666',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 600,
                                    marginBottom: '8px'
                                }}
                            >
                                Expires
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#ffffff'
                                }}
                            >
                                {formatDate(user.expiresAt, currentLang, baseTranslations)}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Text
                                style={{
                                    fontSize: '11px',
                                    color: '#666666',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 600,
                                    marginBottom: '8px'
                                }}
                            >
                                Bandwidth
                            </Text>
                            <Text
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
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
