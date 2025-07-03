import { ArticleDetails } from '@modules/articles';
import { Comments } from '@modules/comments';
import { useParams } from 'react-router-dom';

export function ArticlePage() {
  const { id } = useParams();

  return (
    <ArticleDetails
      id={String(id)}
      commentSlot={
        <Comments parentId={String(id)} />
      }
    />
  );
}
