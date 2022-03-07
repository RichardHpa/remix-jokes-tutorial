import type { LoaderFunction } from 'remix';

import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const take = url.searchParams.get('take');
  const jokes = await db.joke.findMany({
    take: take ? parseInt(take) : 100,
    orderBy: { createdAt: 'desc' },
    include: { jokester: { select: { username: true } } },
  });

  return new Response(JSON.stringify(jokes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
