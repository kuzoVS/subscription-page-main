import {
    IconBrandDiscord,
    IconBrandTelegram,
    IconBrandVk,
    IconMessageChatbot
} from '@tabler/icons-react'
import { ActionIcon, Group, Image } from '@mantine/core'

import classes from './subscription-link.module.css'

interface IProps {
    supportUrl: string
}

export const SubscriptionLinkWidget = ({ supportUrl }: IProps) => {
    const renderSupportLink = (supportUrl: string) => {
        const telegramIconSrc = '/assets/icons/figma/telegram.svg'
        const iconConfig = {
            't.me': { icon: IconBrandTelegram, color: '#0088cc', useAsset: true },
            'discord.com': { icon: IconBrandDiscord, color: '#5865F2', useAsset: false },
            'vk.com': { icon: IconBrandVk, color: '#0077FF', useAsset: false }
        }

        const matchedPlatform = Object.entries(iconConfig).find(([domain]) =>
            supportUrl.includes(domain)
        )

        const { icon: Icon, color, useAsset } = matchedPlatform
            ? matchedPlatform[1]
            : { icon: IconMessageChatbot, color: 'cyan', useAsset: false }

        return (
            <ActionIcon
                c={color}
                className={classes.actionIcon}
                component="a"
                href={supportUrl}
                radius="xl"
                rel="noopener noreferrer"
                size={45}
                target="_blank"
                variant="default"
            >
                {useAsset ? (
                    <Image alt="telegram" h={19} src={telegramIconSrc} w={19} />
                ) : (
                    <Icon size={19} />
                )}
            </ActionIcon>
        )
    }

    return (
        <Group gap="xs" ml="auto" wrap="nowrap">
            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
