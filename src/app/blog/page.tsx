import BlurFade from "@/components/magicui/blur-fade";
import { fetchMediumPosts } from "@/lib/medium-service";
import { PixperkBlogCard } from "@/components/pixperk-blog-card";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Thoughts, insights, and deep dives on ML research, AI systems, and software engineering.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await fetchMediumPosts();

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.slice(1);

  return (
    <section className="max-w-[1000px] mx-auto pb-24">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-10">
          <h1
            className="text-2xl font-bold tracking-tight text-white/90 mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            satyam<span className="text-violet-400">/blog</span>
          </h1>
          <p className="text-sm text-white/40 max-w-xl leading-relaxed">
            Thoughts, insights, and deep dives on machine learning, AI systems, and software engineering.
          </p>
        </div>
      </BlurFade>

      {/* Featured Post */}
      {featuredPost && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="mb-8">
            <PixperkBlogCard
              title={featuredPost.title}
              description={featuredPost.description}
              date={new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              image={featuredPost.image}
              tags={featuredPost.tags}
              slug={featuredPost.slug}
              readTime={featuredPost.readTime}
              featured={true}
            />
          </div>
        </BlurFade>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {remainingPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
            <PixperkBlogCard
              title={post.title}
              description={post.description}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              image={post.image}
              tags={post.tags}
              slug={post.slug}
              readTime={post.readTime}
            />
          </BlurFade>
        ))}
      </div>

      {/* View All on Medium */}
      <div className="flex justify-center pt-10">
        <a
          href="https://medium.com/@mistarisatyam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors border border-white/[0.06] rounded-lg px-6 py-3 hover:border-white/[0.12] hover:bg-white/[0.02]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          <span>View all posts on Medium</span>
        </a>
      </div>
    </section>
  );
}
