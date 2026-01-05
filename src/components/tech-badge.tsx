"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode;
}

const techIcons: Record<string, React.ReactNode> = {
  // Core Languages
  "Python": <Icons.python className="w-3.5 h-3.5" />,
  "PYTHON": <Icons.python className="w-3.5 h-3.5" />,

  // AI/ML/DL Frameworks
  "PyTorch": <Icons.pytorch className="w-3.5 h-3.5" />,
  "PYTORCH": <Icons.pytorch className="w-3.5 h-3.5" />,
  "TensorFlow": <Icons.tensorflow className="w-3.5 h-3.5" />,
  "TENSORFLOW": <Icons.tensorflow className="w-3.5 h-3.5" />,
  "scikit-learn": <Icons.sklearn className="w-3.5 h-3.5" />,
  "Sklearn": <Icons.sklearn className="w-3.5 h-3.5" />,
  "SKLEARN": <Icons.sklearn className="w-3.5 h-3.5" />,
  "Hugging Face": <Icons.huggingface className="w-3.5 h-3.5" />,
  "HuggingFace": <Icons.huggingface className="w-3.5 h-3.5" />,
  "HUGGINGFACE": <Icons.huggingface className="w-3.5 h-3.5" />,

  // AI/ML Libraries
  "OpenCV": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="OpenCV" />,
  "OPENCV": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="OpenCV" />,

  // Cloud Providers
  "AWS": <Image src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" width={14} height={14} className="w-3.5 h-3.5" alt="AWS" />,
  "Azure": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Azure" />,
  "GCP": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="GCP" />,
  "Cloudflare": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Cloudflare" />,

  // DevOps & Deployment
  "Docker": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Docker" />,
  "Kubernetes": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Kubernetes" />,
  "Vercel": <Image src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" width={14} height={14} className="w-3.5 h-3.5" alt="Vercel" />,

  // Big Data
  "Apache Spark": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Apache Spark" />,
  "Spark": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Spark" />,
  "Hadoop": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Hadoop" />,
  "Kafka": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Kafka" />,

  // Databases
  "PostgreSQL": <Icons.postgresql className="w-3.5 h-3.5" />,
  "MongoDB": <Icons.mongodb className="w-3.5 h-3.5" />,
  "Firebase": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Firebase" />,
  "Redis": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Redis" />,

  // Web Development
  "React": <Icons.react className="w-3.5 h-3.5" />,
  "Bun": <Icons.bun className="w-3.5 h-3.5" />,
  "Javascript": <Icons.javascript className="w-3.5 h-3.5" />,
  "JavaScript": <Icons.javascript className="w-3.5 h-3.5" />,
  "TypeScript": <Icons.typescript className="w-3.5 h-3.5" />,
  "TS": <Icons.typescript className="w-3.5 h-3.5" />,
  "Node.js": <Icons.nodejs className="w-3.5 h-3.5" />,
  "Next.js": <Icons.nextjs className="w-3.5 h-3.5" />,
  "N": <Icons.nextjs className="w-3.5 h-3.5" />,
  "Prisma": <Icons.prisma className="w-3.5 h-3.5" />,
  "Tailwind CSS": <Icons.tailwindcss className="w-3.5 h-3.5" />,
  "Flask": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Flask" />,
  "FLASK": <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width={14} height={14} className="w-3.5 h-3.5" alt="Flask" />,
};

export function TechBadge({ name, icon }: TechBadgeProps) {
  const displayIcon = icon || techIcons[name] || null;

  return (
    <div className="bg-[#161616] dark:bg-[#161616] light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 rounded-md px-2 py-1 flex items-center gap-1.5 hover:border-dashed hover:bg-[#1a1a1a] dark:hover:bg-[#1a1a1a] light:hover:bg-zinc-200 transition-all">
      {displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}
      <span className="text-white dark:text-white light:text-zinc-900 uppercase text-[9px] font-medium tracking-tight">{name.toUpperCase()}</span>
    </div>
  );
}

