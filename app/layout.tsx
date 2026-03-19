import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Logo from "./Logo";
import { Analytics } from "@vercel/analytics/next";
import "./styles.css";

export const metadata = {
  metadataBase: new URL('https://docs.harness.design'),
};

const navbar = (
  <Navbar
    logo={<Logo />}
    logoLink="https://harness.design"
    // ... Your additional navbar options
  />
);
const footer = (
  <Footer>Copyright © {new Date().getFullYear()} harness.design</Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/images/general/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
          // ... Your additional layout options
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
