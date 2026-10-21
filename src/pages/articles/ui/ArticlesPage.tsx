import { Link } from 'react-router-dom';
import { getArticles } from '@/entities/info-page';
import { useDocumentTitle } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import './articles-page.css';

export function ArticlesPage() {
  useDocumentTitle('Статьи о чае');
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Статьи о чае' }]} />
      <h1 className="page-title">Статьи о чае</h1>
      <ul className="articles-list">
        {getArticles().map((article) => (
          <li key={article.path}>
            <article className="article-preview">
              <h2 className="article-preview__title">
                <Link to={article.path}>{article.title}</Link>
              </h2>
              {article.excerpt && <p className="article-preview__excerpt">{article.excerpt}</p>}
              <Link className="article-preview__more" to={article.path} aria-label={`Читать: ${article.title}`}>Читать далее</Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
