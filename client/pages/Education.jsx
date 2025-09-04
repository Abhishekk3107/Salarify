import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { articles } from '@/lib/articles.js';

// Education listing page — concise and human-friendly copy.
export default function Education() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Financial Education</h1>
        <p className="mt-2 text-muted-foreground">Short articles to help you make better financial choices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.slug} to={`/learn/${a.slug}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{a.title}</CardTitle>
                <CardDescription>{a.readTime} • {a.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
