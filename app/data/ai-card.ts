export interface Kategori {
    id: number;
    name: string;
  }
  
  export interface AI {
    id: number;
    name: string;
    deskripsi: string;
    url: string;
    gambar: string;
    kategori: Kategori;
  }
  
  export interface AiCardProps {
    logo: string;
    name: string;
    category: string;
    deskripsi: string;
    url: string;
  }