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
            <Box className="header-wrapper" py="md">
                <Container maw={1200} px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                    <Group justify="space-between" wrap="nowrap" style={{ paddingLeft: '0' }}>
                        <Stack gap={4} style={{ userSelect: 'none' }}>
                            <Group gap="sm" wrap="nowrap" align="center">
                                {hasCustomLogo ? (
                                    <Image
                                        alt="logo"
                                        fit="contain"
                                        src={config.brandingSettings.logoUrl}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            flexShrink: 0,
                                            borderRadius: '10px'
                                        }}
                                    />
                                ) : (
                                    <RemnawaveLogo c="#10b981" size={36} />
                                )}
                                <Stack gap={2} style={{ lineHeight: 1.2 }}>
                                    <Title
                                        c="#64748b"
                                        fw={500}
                                        order={6}
                                        size="xs"
                                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                                    >
                                        VPN Service
                                    </Title>
                                    <Title
                                        c="#10b981"
                                        fw={600}
                                        order={6}
                                        size="md"
                                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', letterSpacing: '-0.02em' }}
                                    >
                                        {brandName}
                                    </Title>
                                </Stack>
                            </Group>
                        </Stack>

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
                maw={1200}
                px={{ base: 'md', sm: 'lg', md: 'xl' }}
                pt="xl"
                pb={0}
                style={{
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Stack gap="md" style={{ paddingBottom: '0' }}>
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
