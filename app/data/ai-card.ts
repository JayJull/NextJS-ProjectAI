export interface Kategori {
  id: number;
  nama: string;
}

export interface AI {
  id: number;
  name: string;
  shortDesc: string;
  longDesc: string;
  url: string;
  shortLink: string | null;
  click: number;
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
