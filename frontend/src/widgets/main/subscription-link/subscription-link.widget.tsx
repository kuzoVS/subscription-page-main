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
                radius="50%"
                rel="noopener noreferrer"
                size={30}
                target="_blank"
                variant="default"
                style={{
                    width: 30,
                    height: 30,
                    background: '#16162a',
                    border: '0.5px solid #2a2a45'
                }}
            >
                <IconBrandTelegram style={{ width: 14, height: 14, color: '#6666aa' }} />
            </ActionIcon>
        )
    }

    const handleGetLink = () => {
        vibrate('tap')

        const subscriptionQrCode = renderSVG(subscriptionUrl, {
            whiteColor: '#ffffff',
            blackColor: '#333333'
        })

        modals.open({
            centered: true,
            title: t(baseTranslations.getLink),
            classNames: {
                content: classes.modalContent,
                header: classes.modalHeader,
                title: classes.modalTitle
            },
            children: (
                <Stack align="center">
                    <Image
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                        style={{ borderRadius: 'var(--mantine-radius-md)' }}
                    />
                    <Text c="white" fw={600} size="lg" ta="center">
                        {t(baseTranslations.scanQrCode)}
                    </Text>
                    <Text c="dimmed" size="sm" ta="center">
                        {t(baseTranslations.scanQrCodeDescription)}
                    </Text>

                    <Button
                        fullWidth
                        leftSection={<IconCopy />}
                        onClick={handleCopy}
                        radius="md"
                        variant="light"
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
                    radius={0}
                    size={28}
                    variant="default"
                    style={{
                        width: 28,
                        height: 28,
                        background: 'transparent',
                        border: '0.5px solid #1a1a1a',
                        fontFamily: "'JetBrains Mono', monospace"
                    }}
                >
                    <IconLink style={{ width: 13, height: 13, color: '#444' }} />
                </ActionIcon>
            )}

            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
