"use server";
import { NextResponse } from "next/server";
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

interface CreateShortlinkData {
  shortPath?: string;
  originalUrl: string;
}

interface UpdateShortlinkData extends CreateShortlinkData {
  id: number;
}

export async function getKategori() {
  try {
    const kategori = await prisma.kategori.findMany({
      select: {
        id: true,
        nama: true,
      },
    });
    return kategori;
  } catch (error) {
    console.error("Error fetching kategori:", error);
    throw new Error("Gagal mengambil data kategori");
  }
}

export async function getAi() {
  try {
    const ais = await prisma.ai.findMany({
      include: {
        kategori: true,
      },
    });
    return ais.map((ai) => ({
      ...ai,
      kategori: {
        id: ai.kategori.id,
        name: ai.kategori.nama,
      },
    }));
  } catch (error) {
    console.error("Error fetching AI data:", error);
    throw new Error("Gagal mengambil data");
  }
}

export async function createAi(data: CreateAIData) {
  try {
    if (
      !data.name ||
      !data.deskripsi ||
      !data.url ||
      !data.gambar ||
      !data.kategoriId
    ) {
      throw new Error("Semua field harus diisi");
    }

    const kategori = await prisma.kategori.findUnique({
      where: {
        id: data.kategoriId,
      },
    });

    if (!kategori) {
      throw new Error("Kategori tidak ditemukan");
    }

    const newAi = await prisma.ai.create({
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        url: data.url,
        gambar: data.gambar,
        kategoriId: data.kategoriId,
      },
      include: {
        kategori: true,
      },
    });

    return {
      id: newAi.id,
      name: newAi.name,
      deskripsi: newAi.deskripsi,
      url: newAi.url,
      gambar: newAi.gambar,
      kategori: {
        id: newAi.kategori.id,
        name: newAi.kategori.nama,
      },
    };
  } catch (error) {
    console.error("Error creating AI:", error);
    throw new Error("Gagal menambahkan data AI");
  }
}

export async function updateAi(data: UpdateAIData) {
  try {
    if (
      !data.id ||
      !data.name ||
      !data.deskripsi ||
      !data.url ||
      !data.gambar ||
      !data.kategoriId
    ) {
      throw new Error("Semua field harus diisi");
    }

    const existingAi = await prisma.ai.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!existingAi) {
      throw new Error("Data AI tidak ditemukan");
    }

    const kategori = await prisma.kategori.findUnique({
      where: {
        id: data.kategoriId,
      },
    });

    if (!kategori) {
      throw new Error("Kategori tidak ditemukan");
    }

    const updatedAi = await prisma.ai.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        deskripsi: data.deskripsi,
        url: data.url,
        gambar: data.gambar,
        kategoriId: data.kategoriId,
      },
      include: {
        kategori: true,
      },
    });

    return {
      id: updatedAi.id,
      name: updatedAi.name,
      deskripsi: updatedAi.deskripsi,
      url: updatedAi.url,
      gambar: updatedAi.gambar,
      kategori: {
        id: updatedAi.kategori.id,
        name: updatedAi.kategori.nama,
      },
    };
  } catch (error) {
    console.error("Error updating AI:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Gagal mengupdate data AI");
  }
}

export async function deleteAi(id: number) {
  try {
    const existingAi = await prisma.ai.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingAi) {
      throw new Error("Data AI tidak ditemukan");
    }

    await prisma.ai.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Data AI berhasil dihapus",
    };
  } catch (error) {
    console.error("Error deleting AI:", error);
    throw new Error("Gagal menghapus data AI");
  }
}

export async function importAi(request: Request) {
  try {
    const { data } = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      data.map(async (item) => {
        const kategori = await prisma.kategori.findUnique({
          where: { id: item.kategoriId },
        });

        if (!kategori) {
          throw new Error(`Kategori with ID ${item.kategoriId} not found`);
        }
        
        return prisma.ai.create({
          data: {
            name: item.name,
            deskripsi: item.deskripsi,
            url: item.url,
            gambar: item.gambar,
            kategoriId: item.kategoriId,
          },
        });
      })
    );

    return NextResponse.json({
      message: "Data imported successfully",
      count: results.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Failed to import data" },
      { status: 500 }
    );
  }
}

export async function DeskripsiAi(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const ai = await prisma.ai.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!ai) {
      return NextResponse.json({ error: "AI not found" }, { status: 404 });
    }
    return NextResponse.json(ai);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching AI" }, { status: 500 });
  }
}

export async function getShortlink(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const ai = await prisma.ai.findFirst({
      where: {
        shortLink: params.slug,
      },
      select: {
        url: true,
      },
    });

    if (!ai) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    return NextResponse.redirect(new URL(ai.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/404', request.url));
  }
}