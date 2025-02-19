import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { originalUrl } = req.body;
      
      // Bersihkan URL dari protocol
      const cleanUrl = originalUrl.replace(/^(https?:\/\/)/, '');
      const shortPath = `aifree/${cleanUrl}`;
      
      // Simpan ke database
      const shortlink = await prisma.shortlink.create({
        data: {
          shortPath,
          originalUrl: cleanUrl,
          click: 0,
        },
      });
      
      return res.status(200).json(shortlink);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating shortlink' });
    }
  }
}