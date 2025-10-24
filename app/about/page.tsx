import Bio from "@/components/about/Bio";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Stack from "@/components/about/Stack";

export default function Page() {
  return (
    <>
      <Bio />
      <Stack />
      <Experience />
      <Education />
    </>
  );
}