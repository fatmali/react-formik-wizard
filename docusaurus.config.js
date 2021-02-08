module.exports = {
  title: "React Formik Wizard",
  tagline: "",
  url: "https://fatmali.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "fatmali", // Usually your GitHub org/user name.
  projectName: "react-formik-wizard", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "React Formik Wizard",
      logo: {
        alt: "",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Playground", position: "left" },
        {
          href: "https://github.com/fatmali/react-formik-wizard",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "Icons made by Freepik from FlatIcon",
              href:
                'https://www.flaticon.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Formik Wizard, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/fatmali/react-formik-wizard/edit/gh-pages/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/fatmali/react-formik-wizard/edit/gh-pages/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
