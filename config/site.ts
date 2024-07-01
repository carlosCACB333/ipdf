export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "IPDF",
  description: "aplicación para manipular archivos PDF en línea",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ],
  links: {
    github: "https://github.com/carlosCACB333/ipdf",
    twitter: "https://x.com/carloscb8080",
    sponsor: "https://carloscb.com",
  },
};
