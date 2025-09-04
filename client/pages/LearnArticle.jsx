import { useParams, Link } from 'react-router-dom';
import { articles } from '@/lib/articles.js';

export default function LearnArticle() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Article not found. Go back to <Link className="underline" to="/learn">Education</Link>.</p>
      </div>
    );
  }
  return (
    <div className="container py-10 prose prose-slate dark:prose-invert max-w-3xl">
      <Link to="/learn" className="no-underline text-sm">← Back to Education</Link>
      <h1 className="mt-2">{article.title}</h1>
      <p className="text-sm text-muted-foreground">{article.readTime} • {article.category}</p>
      <p>{article.content}</p>
    </div>
  );
}
