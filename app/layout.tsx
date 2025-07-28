import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Logo from "./Logo";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const navbar = (
  <Navbar
    logo={<Logo />}
    // ... Your additional navbar options
  />
);
const footer = (
  <Footer>Copyright © {new Date().getFullYear()} harness.design</Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
      // ... Your additional head options
      >
        <link rel="shortcut icon" href="/images/general/icon.svg" />
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
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
