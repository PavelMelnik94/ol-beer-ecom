import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string; }>();

  return (
    <div>
      Product Details for ID:
      {id}
    </div>
  );
}
