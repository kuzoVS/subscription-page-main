import { Box, Center, Container, Group, Image, Stack, Title } from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    RawKeysWidget,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    SubscriptionInfoCardsMinimalDarkWidget,
    SubscriptionInfoCollapsedMinimalDarkWidget,
    SubscriptionInfoExpandedMinimalDarkWidget,
    SubscriptionInfoBrutalWidget,
    SubscriptionLinkWidget,
    TimelineBlockRenderer
} from '@widgets/main'
import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'
import { Page, RemnawaveLogo } from '@shared/ui'

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

const BLOCK_RENDERERS = {
    cards: CardsBlockRenderer,
    timeline: TimelineBlockRenderer,
    accordion: AccordionBlockRenderer,
    minimal: MinimalBlockRenderer
} as const

const SUBSCRIPTION_INFO_BLOCK_RENDERERS = {
    cards: SubscriptionInfoCardsWidget,
    collapsed: SubscriptionInfoCollapsedWidget,
    expanded: SubscriptionInfoExpandedWidget,
    minimalDark: SubscriptionInfoCardsMinimalDarkWidget,
    minimalDarkCollapsed: SubscriptionInfoCollapsedMinimalDarkWidget,
    minimalDarkExpanded: SubscriptionInfoExpandedMinimalDarkWidget,
    brutal: SubscriptionInfoBrutalWidget,
    hidden: null
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

    const brandName = config.brandingSettings.title
    let hasCustomLogo = !!config.brandingSettings.logoUrl

    if (hasCustomLogo) {
        if (config.brandingSettings.logoUrl.includes('docs.rw')) {
            hasCustomLogo = false
        }
    }

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    const SubscriptionInfoBlockRenderer =
        SUBSCRIPTION_INFO_BLOCK_RENDERERS[config.uiConfig.subscriptionInfoBlockType === 'cards'
            ? 'brutal'
            : config.uiConfig.subscriptionInfoBlockType]

    return (
        <Page>
            <Box className="header-wrapper" py={isMobile ? 'sm' : 'md'}>
                <Container maw={1000} px={{ base: 20, sm: 50 }}>
                    <Group justify="space-between" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap" align="center">
                            {hasCustomLogo ? (
                                <Image
                                    alt="logo"
                                    fit="contain"
                                    src={config.brandingSettings.logoUrl}
                                    style={{
                                        width: '34px',
                                        height: '34px'
                                    }}
                                />
                            ) : (
                                <RemnawaveLogo c="#5b8def" size={32} />
                            )}
                            <Stack gap={2}>
                                <Title
                                    c="#ffffff"
                                    fw={700}
                                    order={6}
                                    size="xl"
                                    style={{ fontSize: '22px', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                                >
                                    Clay VPN
                                </Title>
                                <Title
                                    c="#ffffff"
                                    fw={500}
                                    order={6}
                                    size="xs"
                                    style={{ fontSize: '13px', opacity: 0.7 }}
                                >
                                    VPN Service
                                </Title>
                            </Stack>
                        </Group>

                        <Group gap="xs" wrap="nowrap">
                            <SubscriptionLinkWidget
                                hideGetLink={config.baseSettings.hideGetLinkButton}
                                supportUrl={config.brandingSettings.supportUrl}
                            />
                            <LanguagePicker
                                currentLang={currentLang}
                                locales={config.locales}
                                onLanguageChange={setLanguage}
                            />
                        </Group>
                    </Group>
                </Container>
            </Box>

            <Container
                maw={1000}
                px={{ base: 16, sm: 24 }}
                py={{ base: 'md', sm: 'lg' }}
            >
                <Stack gap="md">
                    {SubscriptionInfoBlockRenderer && (
                        <SubscriptionInfoBlockRenderer isMobile={isMobile} />
                    )}

                    {atLeastOnePlatformApp && (
                        <InstallationGuideConnector
                            BlockRenderer={
                                BLOCK_RENDERERS[config.uiConfig.installationGuidesBlockType]
                            }
                            hasPlatformApps={hasPlatformApps}
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}

                    <RawKeysWidget isMobile={isMobile} />
                </Stack>
            </Container>
        </Page>
    )
}
