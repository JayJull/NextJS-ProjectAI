import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ShortLinkPage({
  params,
}: {
  params: { slug: string };
}) {
  const ai = await prisma.ai.findFirst({
    where: {
      shortLink: params.slug,
    },
    select: {
      url: true,
    },
  });

  if (!ai) {
    redirect('/404');
  }

  redirect(ai.url);
}