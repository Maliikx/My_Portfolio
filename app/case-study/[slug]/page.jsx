import { notFound } from "next/navigation";
import { selectedWork } from "@/app/data/selectedWork";
import { CaseStudyClient } from "@/sections/CaseStudyClient";
import TopInfo from "@/sections/components/TopInfo";



export default async function CaseStudyPage({ params }) {

 
  // 1. Await the params
  const { slug } = await params;
  const project = selectedWork.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }
  return (
    <div className=" bg-primary">
                {/* <TopInfo/> */}

      
      <CaseStudyClient project={project}/>
      
    </div>
  );
}

export async function generateStaticParams() {
  return selectedWork.map((project) => ({
    slug: project.slug,
  }));
}
