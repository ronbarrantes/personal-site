import { getBlogPosts } from "@/lib/blog/posts";
import { MainPage } from "@/screens/MainPage";

const HOME_POST_COUNT = 4;

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <MainPage
      posts={posts.slice(0, HOME_POST_COUNT).map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
      }))}
    />
  );
}
