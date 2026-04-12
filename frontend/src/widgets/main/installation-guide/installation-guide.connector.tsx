import {
    TSubscriptionPageAppConfig,
    TSubscriptionPageButtonConfig,
    TSubscriptionPagePlatformKey
} from '@remnawave/subscription-page-types'
import {
    Box,
    Button,
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
                                    width: '14px',
                                    height: '14px'
                                }}
                            />
                        }
                        onClick={() => handleButtonClick(button)}
                        radius="lg"
                        variant="default"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            fontWeight: 500,
                            background: 'rgba(15, 23, 42, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#cbd5e1',
                            padding: '8px 16px',
                            height: 'auto',
                            minHeight: '36px'
                        }}
                        styles={{
                            label: {
                                textTransform: 'none',
                                letterSpacing: 'normal'
                            }
                        }}
                    >
                        {t(button.text)}
                    </Button>
                ))}
            </Group>
        )
    }

    const getIcon = (iconKey: string) => getIconFromLibrary(iconKey, svgLibrary)

    return (
        <div style={{ padding: isMobile ? '12px 0' : '16px 0' }}>
            <Stack gap="md">
                <Group gap="sm" justify="space-between" align="center">
                    <div style={{
                        fontSize: '16px',
                        fontFamily: "'Inter', sans-serif",
                        color: '#f8fafc',
                        fontWeight: 600,
                        letterSpacing: '-0.02em'
                    }}>
                        Install Apps
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
                                        width: 16,
                                        height: 16,
                                        color: '#64748b'
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
                            radius="lg"
                            size="md"
                            value={selectedPlatform}
                            w={180}
                            styles={{
                                input: {
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    fontSize: '14px',
                                    color: '#f8fafc',
                                    fontFamily: "'Inter', sans-serif",
                                    paddingRight: '32px',
                                    paddingLeft: '12px',
                                    height: '40px'
                                },
                                section: {
                                    color: '#64748b'
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
        </div>
    )
}
