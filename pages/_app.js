import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes';
import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
       <meta name="google-site-verification" content="qJPOBhuLxYG31aBQHGtqNlySOVTNp20pDOJhZVXJE9w" />
      </Head>
      <ThemeProvider enableSystem={false}>
      <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp;
