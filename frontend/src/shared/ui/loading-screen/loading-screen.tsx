import { Spinner } from '@gfazioli/mantine-spinner'
import { Center, Stack, Text } from '@mantine/core'

export function LoadingScreen({ height = '100%' }: { height?: string }) {
    return (
        <Center h={height}>
            <Stack align="center" gap="xl" w="100%">
                <Spinner
                    inner={50}
                    segments={30}
                    size={150}
                    speed={1_900}
                    strokeLinecap="round"
                    thickness={3}
                    color="cyan"
                />
                <Text
                    c="cyan"
                    fz="lg"
                    fw={600}
                    style={{
                        textShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                        letterSpacing: '1px'
                    }}
                >
                    Loading Secure Connection...
                </Text>
            </Stack>
        </Center>
    )
}
