import {
    TSubscriptionPageAppConfig,
    TSubscriptionPageButtonConfig,
    TSubscriptionPagePlatformKey
} from '@remnawave/subscription-page-types'
import {
    Box,
    Button,
    ButtonVariant,
    Card,
    Group,
    Select,
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
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

export const InstallationGuideConnector = (props: IProps) => {
    const { isMobile, BlockRenderer, platform } = props

    const { t, currentLang, baseTranslations } = useTranslation()

    const { platforms, svgLibrary } = useAppConfig()
    const { copy } = useClipboard({ timeout: 2_000 })
    const subscription = useSubscription()

    const availablePlatforms = (
        Object.entries(platforms) as [
            TSubscriptionPagePlatformKey,
            (typeof platforms)[TSubscriptionPagePlatformKey]
        ][]
    )
        .filter(([_, platformConfig]) => Boolean(platformConfig?.apps?.length))
        .map(([platform, platformConfig]) => {
            return {
                value: platform,
                label: t(platformConfig!.displayName),
                icon: getIconFromLibrary(platformConfig!.svgIconKey, svgLibrary)
            }
        })

    const [selectedAppIndex, setSelectedAppIndex] = useState(0)
    const [selectedPlatform, setSelectedPlatform] = useState<TSubscriptionPagePlatformKey>(() => {
        if (platform && availablePlatforms.some((item) => item.value === platform)) {
            return platform
        }
        return availablePlatforms[0]!.value
    })
    const selectedPlatformOption = availablePlatforms.find((item) => item.value === selectedPlatform)

    const platformApps = platforms[selectedPlatform]?.apps ?? []
    const selectedApp = platformApps[selectedAppIndex] ?? platformApps[0]

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
                    color: 'cyan'
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
        buttons: TSubscriptionPageButtonConfig[],
        variant: ButtonVariant
    ) => {
        if (buttons.length === 0) return null
        const shouldStretchButtons = buttons.some((button) => t(button.text).length >= 14)

        return (
            <Group
                className={clsx(
                    classes.buttonsGroup,
                    shouldStretchButtons && classes.buttonsGroupStacked
                )}
                gap="xs"
                wrap="wrap"
            >
                {buttons.map((button, index) => {
                    const resolvedIconKey =
                        button.type === 'subscriptionLink'
                            ? 'plus'
                            : button.type === 'external'
                              ? 'external-link'
                              : (button.svgIconKey ?? 'external-link')

                    return (
                        <Button
                            className={clsx(
                                classes.guideActionButton,
                                shouldStretchButtons && classes.guideActionButtonFullWidth
                            )}
                            key={index}
                            leftSection={
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: getIconFromLibrary(resolvedIconKey, svgLibrary)
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 18,
                                        height: 18,
                                        color: '#0c0b16'
                                    }}
                                />
                            }
                            onClick={() => handleButtonClick(button)}
                            radius="xl"
                            size="md"
                            variant={variant}
                        >
                            {t(button.text)}
                        </Button>
                    )
                })}
            </Group>
        )
    }

    const getIcon = (iconKey: string) => getIconFromLibrary(iconKey, svgLibrary)

    return (
        <Card className={classes.guideCard} p={{ base: 'md', md: 'xl' }} radius={24}>
            <Stack gap="md">
                <Group gap="sm" justify="space-between">
                    <Title c="white" fw={600} order={2} size={24}>
                        {t(baseTranslations.installationGuideHeader)}
                    </Title>

                    {availablePlatforms.length > 1 && (
                        <Select
                            allowDeselect={false}
                            className={classes.platformSelect}
                            classNames={{
                                dropdown: classes.platformSelectDropdown,
                                option: classes.platformSelectOption
                            }}
                            comboboxProps={{ withinPortal: true }}
                            data={availablePlatforms.map((opt) => ({
                                value: opt.value,
                                label: opt.label
                            }))}
                            leftSection={
                                selectedPlatformOption ? (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: selectedPlatformOption.icon
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 16,
                                            height: 16
                                        }}
                                    />
                                ) : undefined
                            }
                            onChange={(value) => {
                                if (!value) return
                                vibrate([80])
                                setSelectedPlatform(value as TSubscriptionPagePlatformKey)
                                setSelectedAppIndex(0)
                            }}
                            radius="md"
                            size="sm"
                            value={selectedPlatform}
                        />
                    )}
                </Group>

                {platformApps.length > 0 && (
                    <Box>
                        <div className={classes.appsGrid}>
                            {platformApps.map((app: TSubscriptionPageAppConfig, index: number) => {
                                const isActive = index === selectedAppIndex

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
                                        <span className={classes.appName}>{app.name}</span>
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
