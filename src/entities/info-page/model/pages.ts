import articlesData from './articles.json';
import pagesData from './pages.json';

export interface InfoPage {
  path: string;
  title: string;
  kind: 'info' | 'article';
  /** Text collected from the public page, converted to HTML with local links. */
  html: string;
  source: string;
}

export interface ArticlePreview {
  title: string;
  path: string;
  excerpt: string;
}

const EXCERPT_LENGTH = 220;

const pages = pagesData as InfoPage[];
const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

export const getInfoPage = (path: string) => pages.find((page) => normalize(page.path) === normalize(path));

function excerptFrom(html: string): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(' ', EXCERPT_LENGTH))}…`;
}

export const getArticles = (): ArticlePreview[] =>
  (articlesData as ArticlePreview[]).map((article) => ({
    ...article,
    excerpt: article.excerpt || excerptFrom(getInfoPage(article.path)?.html ?? ''),
  }));
