export interface Kategori {
  id: number;
  name: string;
}

export interface AI {
  id: number;
  name: string;
  shortDesc: string;
  url: string;
  shortLink: string | null;
  gambar: string;
  kategori: Kategori;
}

export interface AiCardProps {
  logo: string;
  name: string;
  category: string;
  shortDesc: string;
  url: string;
  shortLink: string;
}
