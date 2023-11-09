// ./nextjs-app/app/_components/PreviewPosts.tsx

"use client";

import Posts from "@/app/_components/Posts";
import { postsQuery } from "@/lib/queries";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";

export default function PreviewPosts({
  posts = [],
}: {
  posts: SanityDocument[];
}) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}
