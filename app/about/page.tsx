import Bio from "@/components/about/Bio";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Stack from "@/components/about/Stack";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Page() {
  return (
    <>
      <Header />
      <Bio />
      <Stack />
      <Experience />
      <Education />
      <Footer />
    </>
  );
}