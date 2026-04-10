import {
    IconBrandTelegram,
    IconCopy,
    IconLink
} from '@tabler/icons-react'
import { ActionIcon, Button, Group, Image, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { renderSVG } from 'uqr'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-link.module.css'

interface IProps {
    hideGetLink: boolean
    supportUrl: string
}

export const SubscriptionLinkWidget = ({ supportUrl, hideGetLink }: IProps) => {
    const { t, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const clipboard = useClipboard({ timeout: 10000 })

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleCopy = () => {
        notifications.show({
            title: t(baseTranslations.linkCopied),
            message: t(baseTranslations.linkCopiedToClipboard),
            color: 'gray'
        })
        clipboard.copy(subscriptionUrl)
    }

    const renderSupportLink = (supportUrl: string) => {
        const isTelegram = supportUrl.includes('t.me')

        if (!isTelegram) return null

        return (
            <ActionIcon
                component="a"
                href={supportUrl}
                radius={0}
                rel="noopener noreferrer"
                size={28}
                target="_blank"
                variant="default"
                style={{
                    width: 28,
                    height: 28,
                    background: 'transparent',
                    border: '0.5px solid #333',
                    fontFamily: "'JetBrains Mono', monospace"
                }}
            >
                <IconBrandTelegram style={{ width: 14, height: 14, color: '#aaa' }} />
            </ActionIcon>
        )
    }

    const handleGetLink = () => {
        vibrate('tap')

        const subscriptionQrCode = renderSVG(subscriptionUrl, {
            whiteColor: '#5aaa5a',
            blackColor: '#000000'
        })

        modals.open({
            centered: true,
            title: '$ scan-qr',
            classNames: {
                content: classes.modalContent,
                header: classes.modalHeader,
                title: classes.modalTitle
            },
            children: (
                <Stack align="center" style={{ padding: '16px' }}>
                    <div className={classes.qrLabel}>
                        {'┌─ qr-code ──────────────────┐'}
                    </div>
                    <div className={classes.qrContainer}>
                        <Image
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                        />
                    </div>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#5aaa5a' }}>
                            {'└──────────────────────────┘'}
                        </div>
                    </div>
                    <div className={classes.qrDescription}>
                        {t(baseTranslations.scanQrCode)}
                    </div>
                    <div className={classes.qrDescription}>
                        {t(baseTranslations.scanQrCodeDescription)}
                    </div>

                    <Button
                        fullWidth
                        leftSection={<IconCopy size={14} />}
                        onClick={handleCopy}
                        variant="default"
                        className={classes.copyButton}
                    >
                        [copy-link ▸]
                    </Button>
                </Stack>
            )
        })
    }

    return (
        <Group gap="xs" ml="auto" wrap="nowrap">
            {!hideGetLink && (
                <ActionIcon
                    className={classes.actionIcon}
                    onClick={handleGetLink}
                    radius={0}
                    size={28}
                    variant="default"
                    style={{
                        width: 28,
                        height: 28,
                        background: 'transparent',
                        border: '0.5px solid #333',
                        fontFamily: "'JetBrains Mono', monospace"
                    }}
                >
                    <IconLink style={{ width: 14, height: 14, color: '#aaa' }} />
                </ActionIcon>
            )}

            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
