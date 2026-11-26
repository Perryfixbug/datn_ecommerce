import { useTranslations } from "next-intl"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { SupportEmailForm } from "@/components/layout/support-email-form"
import { Link } from "@/i18n/navigation"
import { routes } from "@/lib/routes"

type FooterLink = { label: string; href: string; external?: boolean }

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: FooterLink[]
}) {
  return (
    <div className="min-w-0">
      <h2 className="text-base font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[13px] text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-white text-foreground dark:bg-card">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:px-8 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))_340px] lg:gap-8 xl:px-24">
        <div>
          <p className="text-2xl font-bold tracking-tight">Anhà</p>
          <p className="mt-3 max-w-[260px] text-[13px] leading-5 text-muted-foreground">
            {t("tagline")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:contents">
          <FooterColumn
            title={t("explore")}
            links={[
              { label: t("products"), href: routes.allProducts },
              { label: t("rooms"), href: routes.allProducts },
              { label: t("about"), href: routes.about },
              { label: t("terms"), href: routes.terms },
            ]}
          />
          <FooterColumn
            title={t("account")}
            links={[
              { label: t("myAccount"), href: routes.account.profile },
              { label: t("payment"), href: routes.account.wallet },
              { label: t("myCart"), href: routes.cart },
              { label: t("addresses"), href: routes.account.addresses },
            ]}
          />
          <FooterColumn
            title={t("connect")}
            links={[
              {
                label: "Facebook",
                href: "https://www.facebook.com",
                external: true,
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com",
                external: true,
              },
              { label: "Twitter", href: "https://x.com", external: true },
            ]}
          />
        </div>

        <div>
          <h2 className="text-base font-semibold">{t("support")}</h2>
          <SupportEmailForm className="mt-4" />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8 xl:px-24">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-2">
            <span>{t("language")}</span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
