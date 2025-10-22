import ContentList from "@/components/shared/ContentList";
import blogs from "@/utils/blogs";

export default function page() {
  return (
    <main className="items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 w-full max-w-7xl mx-auto">
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr] mb-15">
        <h1 className="col-start-1 text-8xl font-bold mb-8">Projects</h1>
      <div className="col-start-1 max-w-3xl text-slate-300 text-lg leading-relaxed space-y-6">My portfolio of websites ive created with code.</div>
      </div>
      <ContentList contentType="projects" items={blogs} />
    </main>
  )
}
