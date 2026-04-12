import {
    IconBrandTelegram,
    IconCopy,
    IconQrcode
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
                radius="xl"
                rel="noopener noreferrer"
                size={45}
                target="_blank"
                variant="default"
                className={classes.actionIcon}
            >
                <IconBrandTelegram style={{ width: 20, height: 20, color: '#5b8def' }} />
            </ActionIcon>
        )
    }

    const handleGetLink = () => {
        vibrate('tap')

        const subscriptionQrCode = renderSVG(subscriptionUrl, {
            whiteColor: '#ffffff',
            blackColor: '#0a0a0f'
        })

        modals.open({
            centered: true,
            title: (
                <Text style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                    {t(baseTranslations.scanQrCode)}
                </Text>
            ),
            classNames: {
                content: classes.modalContent,
                header: classes.modalHeader,
                title: classes.modalTitle
            },
            children: (
                <Stack align="center" style={{ padding: '20px' }}>
                    <Text className={classes.qrDescription}>
                        {t(baseTranslations.scanQrCodeDescription)}
                    </Text>
                    
                    <div className={classes.qrContainer}>
                        <Image
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                            style={{ maxWidth: '200px' }}
                        />
                    </div>

                    <Button
                        fullWidth
                        leftSection={<IconCopy size={16} />}
                        onClick={handleCopy}
                        variant="default"
                        className={classes.copyButton}
                    >
                        {t(baseTranslations.copyLink)}
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
                    radius="xl"
                    size={45}
                    variant="default"
                >
                    <IconQrcode style={{ width: 20, height: 20, color: '#8888a0' }} />
                </ActionIcon>
            )}

            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
