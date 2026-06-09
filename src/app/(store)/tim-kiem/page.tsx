import { Suspense } from 'react';
import { SearchView } from './_components/search-view';

export default function TimKiemPage() {
  return (
    <Suspense fallback={null}>
      <SearchView />
    </Suspense>
  );
}
