'use server'
import { prisma } from "@/lib/prisma";


interface CreateAIData {
  name: string;
  deskripsi: string;
  url: string;
  gambar: string;
  kategoriId: number;
}

interface UpdateAIData extends CreateAIData {
  id: number;
}

export async function getKategori() {
  try {
    const kategori = await prisma.kategori.findMany({
      select: {
        id: true,
        nama: true
      }
    });
    return kategori;
  } catch (error) {
    console.error('Error fetching kategori:', error);
    throw new Error('Gagal mengambil data kategori');
  }
}

export async function getAi() {
  try {
    const ais = await prisma.ai.findMany({
        include: {
            kategori: true
        }
    });
    return ais.map(ai => ({
        ...ai, kategori: {
            id: ai.kategori.id,
            name: ai.kategori.nama
        }
    }));
  } catch (error) {
    console.error('Error fetching AI data:', error);
    throw new Error('Gagal mengambil data');
  }
}

export async function createAi(data: CreateAIData) {
  try {    
    if (!data.name || !data.deskripsi || !data.url || !data.gambar || !data.kategoriId) {
      throw new Error('Semua field harus diisi');
    }

    const kategori = await prisma.kategori.findUnique({
      where: {
        id: data.kategoriId
      }
    });

    if (!kategori) {
      throw new Error('Kategori tidak ditemukan');
    }

    const newAi = await prisma.ai.create({
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        url: data.url,
        gambar: data.gambar,
        kategoriId: data.kategoriId
      },
      include: {
        kategori: true
      }
    });

    return {
      id: newAi.id,
      name: newAi.name,
      deskripsi: newAi.deskripsi,
      url: newAi.url,
      gambar: newAi.gambar,
      kategori: {
        id: newAi.kategori.id,
        name: newAi.kategori.nama
      }
    };

  } catch (error) {
    console.error('Error creating AI:', error);
    throw new Error('Gagal menambahkan data AI');
  }
}

export async function updateAi(data: UpdateAIData) {
  try {    
    if (!data.id || !data.name || !data.deskripsi || !data.url || !data.gambar || !data.kategoriId) {
      throw new Error('Semua field harus diisi');
    }

    const existingAi = await prisma.ai.findUnique({
      where: {
        id: data.id
      }
    });

    if (!existingAi) {
      throw new Error('Data AI tidak ditemukan');
    }

    const kategori = await prisma.kategori.findUnique({
      where: {
        id: data.kategoriId
      }
    });

    if (!kategori) {
      throw new Error('Kategori tidak ditemukan');
    }

    const updatedAi = await prisma.ai.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        url: data.url,
        gambar: data.gambar,
        kategoriId: data.kategoriId
      },
      include: {
        kategori: true
      }
    });

    return {
      id: updatedAi.id,
      name: updatedAi.name,
      deskripsi: updatedAi.deskripsi,
      url: updatedAi.url,
      gambar: updatedAi.gambar,
      kategori: {
        id: updatedAi.kategori.id,
        name: updatedAi.kategori.nama
      }
    };

  } catch (error) {
    console.error('Error updating AI:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Gagal mengupdate data AI');
  }
}

export async function deleteAi(id: number) {
  try {
    const existingAi = await prisma.ai.findUnique({
      where: {
        id: id
      }
    });

    if (!existingAi) {
      throw new Error('Data AI tidak ditemukan');
    }

    await prisma.ai.delete({
      where: {
        id: id
      }
    });

    return {
      message: 'Data AI berhasil dihapus'
    };

  } catch (error) {
    console.error('Error deleting AI:', error);
    throw new Error('Gagal menghapus data AI');
  }
}