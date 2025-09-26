import Image from 'next/image'

export default function PortfolioItem({ image, title, description, link }: { image: string; title: string; description: string; link: string }) {
  return (
    <div className="border-(--light-blue) border-2 rounded-xl p-6 transition-all duration-300 hover:bg-(--dark-blue) hover:shadow-md">
      <Image src={`/images/${image}.png`} alt={title} width={1000} height={800} className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-(--light-blue)" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-white mb-4">{description}</p>
      <a href={link} target="_blank" className="bg-(--light-blue) text-white w-full text-center px-4 py-2 mt-auto rounded-2xl hover:font-bold transition-colors duration-300 inline-block">View Project</a>
    </div>
  )
}
