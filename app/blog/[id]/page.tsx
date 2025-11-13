import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import blogs from "@/utils/blogs";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <main className="w-full max-w-7xl mx-auto px-4 py-10 text-center text-slate-100">
        <h1 className="text-4xl font-bold">Blog not found</h1>
      </main>
    );
  }

  return (
    <>
      <Header />
      <article className="w-full max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 bg-slate-900 text-slate-100 lg:rounded-2xl md:my-10 border border-slate-800">
        <div className="flex flex-col w-full space-y-4">
          <h1 className="gap-x-8 gap-y-6 text-5xl md:text-7xl font-bold mb-8">{blog.title}</h1>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-yellow-400 rounded-lg text-sm text-slate-900 font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-slate-400 text-lg font-medium">
            Thursday, August 12 2023
          </div>
          <div className="w-[1100px] border-b border-slate-800 mb-5"></div>

          <div
            className="rich-text text-slate-300 text-lg leading-relaxed space-y-6 prose prose-invert"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
      <Footer />
    </>
  );
}
