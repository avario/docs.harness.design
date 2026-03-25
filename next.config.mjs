import nextra from "nextra";

const withNextra = nextra({
    search: true,
    defaultShowCopyCode: true,
});

export default withNextra({
    // ... Other Next.js config options
    // output: 'export'
    async redirects() {
        return [
            // Features → Feature
            { source: '/feature', destination: '/feature/nets', permanent: true },
            { source: '/features', destination: '/feature/nets', permanent: true },
            { source: '/features/feature-local-data', destination: '/feature/local-data', permanent: true },
            { source: '/features/feature-mates', destination: '/feature/mates', permanent: true },
            { source: '/features/feature-mobile', destination: '/feature/mobile', permanent: true },
            { source: '/features/feature-nets', destination: '/feature/nets', permanent: true },
            { source: '/features/feature-sharing', destination: '/feature/sharing', permanent: true },
            { source: '/features/feature-split-screen', destination: '/feature/split-screen', permanent: true },
            { source: '/features/feature-validation', destination: '/feature/validation', permanent: true },

            // Views → View
            { source: '/views', destination: '/view', permanent: true },
            { source: '/views/view-connections', destination: '/view/connections', permanent: true },
            { source: '/views/view-layout', destination: '/view/layout', permanent: true },
            { source: '/views/view-parts', destination: '/view/parts', permanent: true },
            { source: '/views/view-schematic', destination: '/view/schematic', permanent: true },
            { source: '/views/main-menu', destination: '/view/main-menu', permanent: true },
            { source: '/views/main-menu/account', destination: '/view/main-menu/account', permanent: true },
            { source: '/views/main-menu/export', destination: '/view/main-menu/export', permanent: true },
            { source: '/views/main-menu/open', destination: '/view/main-menu/open', permanent: true },
            { source: '/views/main-menu/settings', destination: '/view/main-menu/settings', permanent: true },
            { source: '/views/main-menu/share', destination: '/view/main-menu/share', permanent: true },

            // Parts → Part
            { source: '/parts', destination: '/part', permanent: true },
            { source: '/parts/part-cable', destination: '/part/cable', permanent: true },
            { source: '/parts/part-covering', destination: '/part/covering', permanent: true },
            { source: '/parts/part-device', destination: '/part/device', permanent: true },
            { source: '/part/device', destination: '/part/generic', permanent: true },
            { source: '/parts/part-diode', destination: '/part/diode', permanent: true },
            { source: '/parts/part-resistor', destination: '/part/resistor', permanent: true },
            { source: '/parts/part-splice', destination: '/part/splice', permanent: true },
            { source: '/parts/part-terminal', destination: '/part/terminal', permanent: true },
            { source: '/parts/part-wire', destination: '/part/wire', permanent: true },
            { source: '/parts/connector', destination: '/part/connector', permanent: true },
            { source: '/parts/connector/part-backshell', destination: '/part/accessory/backshell', permanent: true },
            { source: '/parts/connector/part-boot', destination: '/part/accessory/boot', permanent: true },
            { source: '/parts/connector/part-contact', destination: '/part/accessory/contact', permanent: true },
            { source: '/parts/connector/part-dust-cover', destination: '/part/accessory/dust-cover', permanent: true },
            { source: '/parts/connector/part-lock', destination: '/part/accessory/lock', permanent: true },

            // Connector accessories (connector folder → accessory folder)
            { source: '/part/connector/backshell', destination: '/part/accessory/backshell', permanent: true },
            { source: '/part/connector/boot', destination: '/part/accessory/boot', permanent: true },
            { source: '/part/connector/contact', destination: '/part/accessory/contact', permanent: true },
            { source: '/part/connector/dust-cover', destination: '/part/accessory/dust-cover', permanent: true },
            { source: '/part/connector/lock', destination: '/part/accessory/lock', permanent: true },

            // accessories → accessory
            { source: '/part/accessories', destination: '/part/accessory', permanent: true },
            { source: '/part/accessories/backshell', destination: '/part/accessory/backshell', permanent: true },
            { source: '/part/accessories/boot', destination: '/part/accessory/boot', permanent: true },
            { source: '/part/accessories/contact', destination: '/part/accessory/contact', permanent: true },
            { source: '/part/accessories/dust-cover', destination: '/part/accessory/dust-cover', permanent: true },
            { source: '/part/accessories/lock', destination: '/part/accessory/lock', permanent: true },

            // Components → Component
            { source: '/components', destination: '/component', permanent: true },
            { source: '/components/component-branch-point', destination: '/component/branch-point', permanent: true },
            { source: '/components/component-bundle', destination: '/component/bundle', permanent: true },
            { source: '/components/component-cable', destination: '/component/cable', permanent: true },
            { source: '/components/component-connector', destination: '/component/connector', permanent: true },
            { source: '/components/component-diode', destination: '/component/diode', permanent: true },
            { source: '/components/component-group', destination: '/component/group', permanent: true },
            { source: '/components/component-layout-point', destination: '/component/layout-point', permanent: true },
            { source: '/components/component-net-label', destination: '/component/net-label', permanent: true },
            { source: '/components/component-resistor', destination: '/component/resistor', permanent: true },
            { source: '/components/component-splice', destination: '/component/splice', permanent: true },
            { source: '/components/component-terminal', destination: '/component/terminal', permanent: true },
            { source: '/components/component-twisted-wires', destination: '/component/twisted-wires', permanent: true },
            { source: '/components/component-wire', destination: '/component/wire', permanent: true },
        ];
    },
});
