import Button from "../shared/Button";
import Avatar from "./Avatar";

export default function Bio() {
  return (
    <main className="w-full max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 space-y-20">
    
          {/* BIO */}
          <section className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
            <h1 className="col-start-1 text-8xl font-bold">About Me</h1>
    
            <div className="col-start-1 max-w-3xl text-slate-300 text-lg leading-relaxed space-y-6">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It
                has roots in a piece of classical Latin literature from 45 BC, making
                it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure
                Latin words, <em>consectetur</em>, from a Lorem Ipsum passage, and
                going through the cites of the word in classical literature, discovered
                the undoubtable source.
              </p>
    
              <p>
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of <em>de Finibus
                Bonorum et Malorum</em> (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of ethics,
                very popular during the Renaissance. The first line of Lorem Ipsum,
                <q>Lorem ipsum dolor sit amet...</q>, comes from a line in section
                1.10.32.
              </p>
    
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                below for those interested. Sections 1.10.32 and 1.10.33 from <em>de
                Finibus Bonorum et Malorum</em> by Cicero are also reproduced in their
                exact original form, accompanied by English versions from the 1914
                translation by H. Rackham.
              </p>
            </div>
            <Button link="/" label="Resume" />
            <Avatar src="/glenn.png" alt="Glenn Hensley III" className="row-start-1 max-w-sm lg:col-start-2 lg:row-end-3" />
          </section>
    </main>
  )
}
