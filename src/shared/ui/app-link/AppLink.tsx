import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; children: ReactNode };

/** Router link for local paths, regular anchor (new tab) for external URLs, tel: and mailto:. */
export function AppLink({ href, children, ...rest }: Props) {
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith('http');
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
