// ./nextjs-app/app/api/preview/route.ts
import { postQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanityFetch";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  if (secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }
  if (!slug) {
    draftMode().enable();
    redirect(`/`);
  } else {
    const post = await sanityFetch({
      query: postQuery,
      params: { slug },
    });
    if (!post) {
      return new Response("Invalid slug", { status: 401 });
    } else {
      draftMode().enable();
      redirect(`/posts/${slug}`);
    }
  }
}
