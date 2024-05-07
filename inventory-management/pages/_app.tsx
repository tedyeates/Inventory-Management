import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
  /** Put your mantine theme override here */
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}