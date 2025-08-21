import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://gentle-forest-3947-nlweb.anniwang.workers.dev/nlweb-dropdown-chat.css" />
        <link rel="stylesheet" href="https://gentle-forest-3947-nlweb.anniwang.workers.dev/common-chat-styles.css" />
        <link rel="stylesheet" href="https://gentle-forest-3947-nlweb.anniwang.workers.dev/chat-page-styles.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
