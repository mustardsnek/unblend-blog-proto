// ./nextjs-app/app/page.tsx

import Posts from "@/app/_components/Posts";
import PreviewPosts from "@/app/_components/PreviewPosts";
import PreviewProvider from "@/app/_components/PreviewProvider";
import { postsQuery } from "@/lib/queries";
import { sanityFetch, token } from "@/lib/sanityFetch";
import { SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    console.log("previewing content");
    return (
      <PreviewProvider token={token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }

  return <Posts posts={posts} />;
}
