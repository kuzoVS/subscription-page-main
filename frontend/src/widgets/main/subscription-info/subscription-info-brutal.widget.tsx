import { IconCheck, IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'
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

    const userColor = isActive || isExpiringSoon ? '#fff' : '#ff4444'
    const userGlow = isActive || isExpiringSoon
        ? 'none'
        : '0 0 8px rgba(255, 68, 68, 0.5)'

    const statusBg = isActive || isExpiringSoon
        ? 'rgba(90, 170, 90, 0.12)'
        : 'rgba(255, 68, 68, 0.12)'
    const statusTextColor = isActive || isExpiringSoon ? '#5aaa5a' : '#ff4444'
    const statusBorderColor = isActive || isExpiringSoon ? '#5aaa5a' : '#ff4444'

    const handleToggle = () => {
        vibrate('tap')
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={classes.wrapper}>
            <UnstyledButton onClick={handleToggle} className={classes.header}>
                <Group gap="xs" wrap="nowrap" style={{ width: '100%' }}>
                    <span className={classes.prompt}>$</span>
                    <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '13px',
                                fontWeight: 500,
                                color: userColor,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textShadow: userGlow
                            }}
                        >
                            <span className={classes.fieldLabel}>user</span>
                            {'='}
                            {user.username}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '11px',
                                color: '#555',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                        </Text>
                    </Stack>

                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <span
                            className={classes.statusBadge}
                            style={{
                                color: statusTextColor,
                                borderColor: statusBorderColor,
                                background: statusBg
                            }}
                        >
                            {isActive || isExpiringSoon ? '●' : '✗'} {statusText}
                        </span>
                        {isExpanded ? (
                            <IconChevronUp size={12} style={{ color: '#333', flexShrink: 0 }} />
                        ) : (
                            <IconChevronDown size={12} style={{ color: '#333', flexShrink: 0 }} />
                        )}
                    </Group>
                </Group>
            </UnstyledButton>

            <Collapse in={isExpanded}>
                <div className={classes.expandedContent}>
                    <div className={classes.terminalBlock}
                         style={{ borderLeftColor: isActive || isExpiringSoon ? '#5aaa5a' : '#ff4444' }}
                    >
                        <div className={classes.fieldsGrid}>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '10px',
                                        color: '#555',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em'
                                    }}
                                >
                                    name
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: userColor,
                                        marginTop: '4px',
                                        textShadow: userGlow
                                    }}
                                >
                                    {user.username}
                                </Text>
                            </div>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '10px',
                                        color: '#555',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em'
                                    }}
                                >
                                    status
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: isActive || isExpiringSoon ? '#5aaa5a' : '#ff4444',
                                        marginTop: '4px'
                                    }}
                                >
                                    {isActive || isExpiringSoon ? '✓' : '✗'} {statusText}
                                </Text>
                            </div>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '10px',
                                        color: '#555',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em'
                                    }}
                                >
                                    expires
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#fff',
                                        marginTop: '4px'
                                    }}
                                >
                                    {formatDate(user.expiresAt, currentLang, baseTranslations)}
                                </Text>
                            </div>
                            <div className={classes.field}>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '10px',
                                        color: '#555',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em'
                                    }}
                                >
                                    bandwidth
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#fff',
                                        marginTop: '4px'
                                    }}
                                >
                                    {user.trafficUsed} / {user.trafficLimit === '0' ? '∞' : user.trafficLimit}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}
