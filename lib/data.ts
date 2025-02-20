"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CreateAIData {
  name: string;
  shortDesc: string;
  longDesc: string;
  url: string;
  shortLink: string;
  click: number;
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
      !data.shortDesc ||
      !data.longDesc ||
      !data.url ||
      !data.shortLink ||
      !data.click ||
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
        shortDesc: data.shortDesc,
        longDesc: data.longDesc,
        url: data.url,
        shortLink: data.shortLink,
        click: data.click,
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
      shortDesc: newAi.shortDesc,
      longDesc: newAi.longDesc,
      url: newAi.url,
      shortLink: newAi.shortLink,
      click: newAi.click,
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

// export async function updateAi(data: UpdateAIData) {
//   try {
//     if (
//       !data.id ||
//       !data.name ||
//       !data.deskripsi ||
//       !data.url ||
//       !data.gambar ||
//       !data.kategoriId
//     ) {
//       throw new Error("Semua field harus diisi");
//     }

//     const existingAi = await prisma.ai.findUnique({
//       where: {
//         id: data.id,
//       },
//     });

//     if (!existingAi) {
//       throw new Error("Data AI tidak ditemukan");
//     }

//     const kategori = await prisma.kategori.findUnique({
//       where: {
//         id: data.kategoriId,
//       },
//     });

//     if (!kategori) {
//       throw new Error("Kategori tidak ditemukan");
//     }

//     const updatedAi = await prisma.ai.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         name: data.name,
//         deskripsi: data.deskripsi,
//         url: data.url,
//         gambar: data.gambar,
//         kategoriId: data.kategoriId,
//       },
//       include: {
//         kategori: true,
//       },
//     });

//     return {
//       id: updatedAi.id,
//       name: updatedAi.name,
//       deskripsi: updatedAi.deskripsi,
//       url: updatedAi.url,
//       gambar: updatedAi.gambar,
//       kategori: {
//         id: updatedAi.kategori.id,
//         name: updatedAi.kategori.nama,
//       },
//     };
//   } catch (error) {
//     console.error("Error updating AI:", error);
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//     throw new Error("Gagal mengupdate data AI");
//   }
// }

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

// export async function importAi(request: Request) {
//   try {
//     const { data } = await request.json();

//     if (!Array.isArray(data)) {
//       return NextResponse.json(
//         { error: "Invalid data format" },
//         { status: 400 }
//       );
//     }

//     const results = await Promise.all(
//       data.map(async (item) => {
//         const kategori = await prisma.kategori.findUnique({
//           where: { id: item.kategoriId },
//         });

//         if (!kategori) {
//           throw new Error(`Kategori with ID ${item.kategoriId} not found`);
//         }
        
//         return prisma.ai.create({
//           data: {
//             name: item.name,
//             deskripsi: item.deskripsi,
//             url: item.url,
//             gambar: item.gambar,
//             kategoriId: item.kategoriId,
//           },
//         });
//       })
//     );

//     return NextResponse.json({
//       message: "Data imported successfully",
//       count: results.length,
//     });
//   } catch (error) {
//     console.error("Import error:", error);
//     return NextResponse.json(
//       { error: "Failed to import data" },
//       { status: 500 }
//     );
//   }
// }