import { Box, Center, Container, Group, Image, Stack, Text } from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    SubscriptionLinkWidget,
    TimelineBlockRenderer
} from '@widgets/main'
import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'
import { Page } from '@shared/ui'

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
    hidden: null
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

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

    const SubscriptionInfoBlockRenderer = SUBSCRIPTION_INFO_BLOCK_RENDERERS.cards
    const normalizedSupportUrl =
        config.brandingSettings.supportUrl.trim() === 'https://t.me/remnawave'
            ? 'https://t.me/HermitVPNBot'
            : config.brandingSettings.supportUrl

    return (
        <Page>
            <Box className="header-wrapper" py={{ base: 'sm', md: 'md' }}>
                <Container maw={1000} px={{ base: 20, md: 50 }}>
                    <Group justify="space-between">
                        <Group gap="sm" style={{ userSelect: 'none' }} wrap="nowrap">
                            <Image
                                alt="Hermit icon"
                                fit="contain"
                                src="/assets/icons/figma/hermit-brand-logo.svg"
                                style={{
                                    width: isMobile ? '39px' : '39px',
                                    height: isMobile ? '37px' : '37px',
                                    flexShrink: 0
                                }}
                            />
                            <Stack gap={3.52} style={{ width: '50.91px' }}>
                                <Image
                                    alt="Hermit"
                                    fit="contain"
                                    src="/assets/icons/figma/logo-hermit-wordmark.svg"
                                    style={{
                                        width: '50.91px',
                                        height: '11.65px',
                                        flexShrink: 0
                                    }}
                                />
                                <Text
                                    c="rgba(255, 255, 255, 0.7)"
                                    fw={500}
                                    size="8.79049px"
                                    style={{
                                        lineHeight: '10px',
                                        width: '48px',
                                        height: '10px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    VPN Service
                                </Text>
                            </Stack>
                        </Group>

                        <SubscriptionLinkWidget
                            supportUrl={normalizedSupportUrl}
                        />
                    </Group>
                </Container>
            </Box>

            <Container
                maw={1000}
                px={{ base: 16, md: 24 }}
                py={{ base: 'md', md: 'lg' }}
                style={{ position: 'relative', zIndex: 1 }}
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
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}

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
