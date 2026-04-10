import {
    TSubscriptionPageAppConfig,
    TSubscriptionPageButtonConfig,
    TSubscriptionPagePlatformKey
} from '@remnawave/subscription-page-types'
import {
    Box,
    Button,
    Card,
    Group,
    NativeSelect,
    Stack,
    Title,
    UnstyledButton
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { useState } from 'react'
import clsx from 'clsx'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { getIconFromLibrary } from '@shared/utils/config-parser'
import { TemplateEngine } from '@shared/utils/template-engine'
import { useAppConfig } from '@entities/app-config-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import { IBlockRendererProps } from './components/blocks/renderer-block.interface'
import classes from './installation-guide.module.css'

export type TBlockVariant = 'accordion' | 'cards' | 'minimal' | 'timeline'

interface IProps {
    BlockRenderer: React.ComponentType<IBlockRendererProps>
    hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean>
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

export const InstallationGuideConnector = (props: IProps) => {
    const { isMobile, hasPlatformApps, BlockRenderer, platform } = props

    const { t, currentLang, baseTranslations } = useTranslation()

    const { platforms, svgLibrary } = useAppConfig()
    const { copy } = useClipboard({ timeout: 2_000 })
    const subscription = useSubscription()

    const [selectedAppIndex, setSelectedAppIndex] = useState(0)
    const [selectedPlatform, setSelectedPlatform] = useState<TSubscriptionPagePlatformKey>(() => {
        if (platform && hasPlatformApps[platform]) {
            return platform
        }

        const firstAvailable = (
            Object.keys(hasPlatformApps) as TSubscriptionPagePlatformKey[]
        ).find((key) => hasPlatformApps[key])
        return firstAvailable!
    })

    const platformApps = platforms[selectedPlatform]!.apps
    const selectedApp = platformApps[selectedAppIndex] ?? platformApps[0]

    const availablePlatforms = (
        Object.entries(hasPlatformApps) as [TSubscriptionPagePlatformKey, boolean][]
    )
        .filter(([_, hasApps]) => hasApps)
        .map(([platform]) => {
            const platformConfig = platforms[platform]!
            return {
                value: platform,
                label: t(platformConfig.displayName),
                icon: getIconFromLibrary(platformConfig.svgIconKey, svgLibrary)
            }
        })

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleButtonClick = (button: TSubscriptionPageButtonConfig) => {
        let formattedUrl: string | undefined

        if (button.type === 'subscriptionLink' || button.type === 'copyButton') {
            formattedUrl = TemplateEngine.formatWithMetaInfo(button.link, {
                username: subscription.user.username,
                subscriptionUrl
            })
        }

        switch (button.type) {
            case 'copyButton': {
                if (!formattedUrl) return

                copy(formattedUrl)
                notifications.show({
                    title: t(baseTranslations.linkCopied),
                    message: t(baseTranslations.linkCopiedToClipboard),
                    color: 'gray'
                })
                break
            }
            case 'external': {
                window.open(button.link, '_blank')
                break
            }
            case 'subscriptionLink': {
                if (!formattedUrl) return

                window.open(formattedUrl, '_blank')
                break
            }
            default:
                break
        }
    }

    const renderBlockButtons = (
        buttons: TSubscriptionPageButtonConfig[]
    ) => {
        if (buttons.length === 0) return null

        return (
            <Group gap="xs" wrap="wrap">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        leftSection={
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: getIconFromLibrary(button.svgIconKey, svgLibrary)
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '12px',
                                    height: '12px'
                                }}
                            />
                        }
                        onClick={() => handleButtonClick(button)}
                        radius={0}
                        variant="default"
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            fontWeight: 400,
                            background: 'transparent',
                            border: '0.5px solid #1a1a1a',
                            color: '#666',
                            padding: '4px 12px',
                            height: 'auto',
                            minHeight: '26px'
                        }}
                        styles={{
                            label: {
                                textTransform: 'none',
                                letterSpacing: 'normal'
                            }
                        }}
                    >
                        [{t(button.text)} ▸]
                    </Button>
                ))}
            </Group>
        )
    }

    const getIcon = (iconKey: string) => getIconFromLibrary(iconKey, svgLibrary)

    return (
        <Card p={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }} radius={0} style={{ border: 'none', background: 'transparent' }}>
            <Stack gap="md">
                <Group gap="sm" justify="space-between">
                    <div style={{
                        fontSize: '12px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#3a6a3a',
                        fontWeight: 500,
                        textShadow: '0 0 6px rgba(58, 106, 58, 0.25)'
                    }}>
                        <span style={{ color: '#555' }}>╰─ </span>
                        install:~$
                    </div>

                    {availablePlatforms.length > 1 && (
                        <NativeSelect
                            data={availablePlatforms.map((opt) => ({
                                value: opt.value,
                                label: opt.label
                            }))}
                            leftSection={
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: availablePlatforms.find(
                                            (opt) => opt.value === selectedPlatform
                                        )!.icon
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 14,
                                        height: 14,
                                        filter: 'grayscale(1) brightness(0.5)'
                                    }}
                                />
                            }
                            onChange={(event) => {
                                vibrate([80])
                                const value = event.target
                                    .value as unknown as TSubscriptionPagePlatformKey
                                setSelectedPlatform(value)
                                setSelectedAppIndex(0)
                            }}
                            radius={0}
                            size="sm"
                            value={selectedPlatform}
                            w={150}
                            styles={{
                                input: {
                                    borderRadius: '0',
                                    border: '0.5px solid #1a1a1a',
                                    background: '#0a0a0a',
                                    fontSize: '11px',
                                    color: '#555',
                                    fontFamily: "'JetBrains Mono', monospace"
                                },
                                section: {
                                    color: '#444'
                                }
                            }}
                        />
                    )}
                </Group>

                {platformApps.length > 0 && (
                    <Box>
                        <div className={classes.appsGrid}>
                            {platformApps.map((app: TSubscriptionPageAppConfig, index: number) => {
                                const isActive = index === selectedAppIndex
                                const hasIcon = Boolean(app.svgIconKey)

                                return (
                                    <UnstyledButton
                                        className={clsx(
                                            classes.appButton,
                                            isActive && classes.appButtonActive,
                                            app.featured && classes.appButtonFeatured
                                        )}
                                        key={app.name}
                                        onClick={() => {
                                            vibrate('toggle')
                                            setSelectedAppIndex(index)
                                        }}
                                    >
                                        {app.featured && <span className={classes.featuredBadge} />}
                                        {hasIcon && (
                                            <span
                                                className={clsx(
                                                    classes.bgIcon,
                                                    isActive && classes.bgIconActive
                                                )}
                                                dangerouslySetInnerHTML={{
                                                    __html: getIconFromLibrary(
                                                        app.svgIconKey!,
                                                        svgLibrary
                                                    )
                                                }}
                                            />
                                        )}
                                        <span className={classes.appName} style={{fontSize: '12px'}}>{app.name}</span>
                                    </UnstyledButton>
                                )
                            })}
                        </div>

                        {selectedApp && (
                            <BlockRenderer
                                blocks={selectedApp.blocks}
                                currentLang={currentLang}
                                getIconFromLibrary={getIcon}
                                isMobile={isMobile}
                                renderBlockButtons={renderBlockButtons}
                                svgLibrary={svgLibrary}
                            />
                        )}
                    </Box>
                )}
            </Stack>
        </Card>
    )
}
