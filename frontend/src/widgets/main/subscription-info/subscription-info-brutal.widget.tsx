import { IconArrowsUpDown, IconCalendar, IconCheck, IconChevronRight, IconUserScan, IconX } from '@tabler/icons-react'
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
        <div className={classes.wrapper}>
            <UnstyledButton onClick={handleToggle} className={classes.header}>
                <Group gap="sm" justify="space-between" wrap="nowrap" style={{ width: '100%' }}>
                    <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, flex: 1 }}>
                        <div className={classes.iconCircle}>
                            {isActive || isExpiringSoon ? (
                                <IconCheck size={12} style={{ color: '#3a6a3a' }} stroke={1.5} />
                            ) : (
                                <IconX size={12} style={{ color: '#444' }} stroke={1.5} />
                            )}
                        </div>
                        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                            <Text
                                c="white"
                                fw={500}
                                style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                                {user.username}
                            </Text>
                            <Text size="xs" style={{ color: '#333', fontSize: '11px', whiteSpace: 'nowrap' }}>
                                {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                            </Text>
                        </Stack>
                    </Group>

                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <div className={classes.statusPill}>
                            {statusText}
                        </div>
                        <IconChevronRight size={14} style={{ color: '#333', flexShrink: 0 }} />
                    </Group>
                </Group>
            </UnstyledButton>

            <Collapse in={isExpanded}>
                <div className={classes.expandedContent}>
                    <div className={classes.fieldsGrid}>
                        <div className={classes.field}>
                            <Group gap={4} wrap="nowrap">
                                <IconUserScan size={14} style={{ color: '#333', flexShrink: 0 }} />
                                <Text style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {t(baseTranslations.name)}
                                </Text>
                            </Group>
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                                {user.username}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Group gap={4} wrap="nowrap">
                                {(isActive || isExpiringSoon) ? (
                                    <IconCheck size={14} style={{ color: '#333', flexShrink: 0 }} />
                                ) : (
                                    <IconX size={14} style={{ color: '#333', flexShrink: 0 }} />
                                )}
                                <Text style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {t(baseTranslations.status)}
                                </Text>
                            </Group>
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                                {statusText}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Group gap={4} wrap="nowrap">
                                <IconCalendar size={14} style={{ color: '#333', flexShrink: 0 }} />
                                <Text style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {t(baseTranslations.expires)}
                                </Text>
                            </Group>
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                                {formatDate(user.expiresAt, currentLang, baseTranslations)}
                            </Text>
                        </div>
                        <div className={classes.field}>
                            <Group gap={4} wrap="nowrap">
                                <IconArrowsUpDown size={14} style={{ color: '#333', flexShrink: 0 }} />
                                <Text style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {t(baseTranslations.bandwidth)}
                                </Text>
                            </Group>
                            <Text style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginTop: '4px' }}>
                                {user.trafficUsed} / {user.trafficLimit === '0' ? '∞' : user.trafficLimit}
                            </Text>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}
