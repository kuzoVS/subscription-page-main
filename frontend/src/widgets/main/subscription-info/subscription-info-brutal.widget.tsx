import { IconCheck, IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'
import { Collapse, Group, Stack, Text, UnstyledButton, Badge, Paper } from '@mantine/core'
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
        <Paper className={classes.wrapper} radius="lg" withBorder>
            <UnstyledButton onClick={handleToggle} className={classes.header}>
                <Group gap="md" wrap="nowrap" style={{ width: '100%' }}>
                    {/* Status indicator */}
                    <div className={classes.statusIndicator}>
                        <div 
                            className={classes.statusDot}
                            style={{
                                background: isActive || isExpiringSoon ? '#10b981' : '#ef4444',
                                animation: (isActive || isExpiringSoon) ? 'status-active 2s ease-in-out infinite' : 'none'
                            }}
                        />
                    </div>

                    <Stack gap={4} style={{ minWidth: 0, flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#f8fafc',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {user.username}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '13px',
                                color: '#64748b'
                            }}
                        >
                            {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                        </Text>
                    </Stack>

                    <Group gap="sm" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <Badge
                            className={classes.statusBadge}
                            color={isActive || isExpiringSoon ? 'green' : 'red'}
                            variant={(isActive || isExpiringSoon) ? 'light' : 'outline'}
                            size="md"
                        >
                            {statusText}
                        </Badge>
                        {isExpanded ? (
                            <IconChevronUp size={18} style={{ color: '#64748b', flexShrink: 0 }} />
                        ) : (
                            <IconChevronDown size={18} style={{ color: '#64748b', flexShrink: 0 }} />
                        )}
                    </Group>
                </Group>
            </UnstyledButton>

            <Collapse in={isExpanded}>
                <div className={classes.expandedContent}>
                    <div className={classes.terminalBlock}>
                        <div className={classes.fieldsGrid}>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '11px',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: 500
                                    }}
                                >
                                    Status
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: isActive || isExpiringSoon ? '#10b981' : '#ef4444',
                                        marginTop: '6px'
                                    }}
                                >
                                    {isActive || isExpiringSoon ? '✓' : '✗'} {statusText}
                                </Text>
                            </div>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '11px',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: 500
                                    }}
                                >
                                    Expires
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: '#f8fafc',
                                        marginTop: '6px'
                                    }}
                                >
                                    {formatDate(user.expiresAt, currentLang, baseTranslations)}
                                </Text>
                            </div>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '11px',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: 500
                                    }}
                                >
                                    Bandwidth
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: '#f8fafc',
                                        marginTop: '6px'
                                    }}
                                >
                                    {user.trafficUsed} / {user.trafficLimit === '0' ? '∞' : user.trafficLimit}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Collapse>
        </Paper>
    )
}
