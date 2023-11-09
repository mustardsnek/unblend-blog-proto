"use server";
import Post from "@/app/_components/Post";
import { client } from "@/lib/client";
import { postPathsQuery, postQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanityFetch";
import { SanityDocument } from "@sanity/client";

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery);

  return posts;
}

export default async function Page({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params });

  return <Post post={post} />;
}
