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
                <div style={{
                    position: 'absolute',
                    top: '7px',
                    left: '14px',
                    zIndex: 200,
                    display: 'flex',
                    gap: '7px',
                    alignItems: 'center'
                }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b', display: 'block', flexShrink: 0 }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffa94d', display: 'block', flexShrink: 0 }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#69db7c', display: 'block', flexShrink: 0 }} />
                </div>

                <Container maw={1200} px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                    <Group justify="space-between" wrap="nowrap">
                        <Group gap="sm" style={{ userSelect: 'none' }} wrap="nowrap">
                            {hasCustomLogo ? (
                                <Image
                                    alt="logo"
                                    fit="contain"
                                    src={config.brandingSettings.logoUrl}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        flexShrink: 0,
                                        opacity: 0.85
                                    }}
                                />
                            ) : (
                                <RemnawaveLogo c="#5aaa5a" size={20} />
                            )}
                            <Stack gap={0} style={{ lineHeight: 1.2 }}>
                                <Title
                                    c="#555"
                                    fw={400}
                                    order={6}
                                    size="xs"
                                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.08em' }}
                                >
                                    ╭─ vpn-service
                                </Title>
                                <Title
                                    c="#5aaa5a"
                                    fw={500}
                                    order={6}
                                    size="xs"
                                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}
                                >
                                    │ {brandName}
                                </Title>
                            </Stack>
                        </Group>

                        <SubscriptionLinkWidget
                            hideGetLink={config.baseSettings.hideGetLinkButton}
                            supportUrl={config.brandingSettings.supportUrl}
                        />
                    </Group>
                </Container>
            </Box>

            <Container
                maw={1200}
                px={{ base: 'md', sm: 'lg', md: 'xl' }}
                py="xl"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Stack gap="xl">
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

                    <Center>
                        <LanguagePicker
                            currentLang={currentLang}
                            locales={config.locales}
                            onLanguageChange={setLanguage}
                        />
                    </Center>
                </Stack>
            </Container>
        </Page>
    )
}
