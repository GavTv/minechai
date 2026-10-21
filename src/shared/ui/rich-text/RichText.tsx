import { useMemo, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './rich-text.css';

const openExternalInNewTab = (html: string) =>
  html.replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1');

/**
 * Renders trusted HTML from local data (texts collected from teaboom.ru).
 * Local links inside the HTML are routed through React Router.
 */
export function RichText({ html, className = '' }: { html: string; className?: string }) {
  const navigate = useNavigate();
  const content = useMemo(() => openExternalInNewTab(html), [html]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href');
    if (!link || !href || !href.startsWith('/') || link.target || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    navigate(href);
  };

  return <div className={`rich-text ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: content }} />;
}
