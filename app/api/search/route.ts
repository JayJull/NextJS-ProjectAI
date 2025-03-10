// app/api/search/route.ts
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category");

  try {
    // Step 1: Process the search terms
    const searchTerms = q
      .split(" ")
      .filter((term) => term.trim() !== "" && term.length >= 2);

    // Always return some results, even without specific search terms
    if (searchTerms.length === 0 && !category) {
      // Return popular AI tools if no search criteria
      const popularTools = await prisma.ai.findMany({
        orderBy: { click: "desc" },
        include: { kategori: true },
        take: 10,
      });

      return NextResponse.json({
        success: true,
        data: popularTools,
        message: "Showing popular AI tools",
      });
    }

    // Step 2: Try to find exact name matches first (highest priority)
    const exactNameMatches =
      searchTerms.length > 0
        ? await prisma.ai.findMany({
            where: {
              OR: searchTerms.map((term) => ({
                name: { contains: term, mode: "insensitive" },
              })),
            },
            include: { kategori: true },
            orderBy: { click: "desc" },
          })
        : [];

    // Step 3: Find category matches if category specified or detected in search terms
    let categoryName = category || "";

    // Extract potential category from search terms if not explicitly provided
    if (!category) {
      const categoryKeywords = {
        Video: ["video", "film", "editing", "youtube"],
        Image: ["gambar", "foto", "image", "picture", "drawing"],
        Audio: ["audio", "suara", "music", "musik", "lagu", "sound"],
        Text: ["text", "tulisan", "artikel", "tulis", "writing"],
        Coding: ["coding", "programming", "code", "kode", "developer"],
        Chat: ["chat", "conversation", "percakapan", "diskusi"],
        Education: [
          "education",
          "learning",
          "belajar",
          "pendidikan",
          "sekolah",
        ],
      };

      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((keyword) => q.toLowerCase().includes(keyword))) {
          categoryName = cat;
          break;
        }
      }
    }

    // Find by category if we have a category
    const categoryMatches = categoryName
      ? await prisma.ai.findMany({
          where: {
            kategori: {
              nama: { contains: categoryName, mode: "insensitive" },
            },
          },
          include: { kategori: true },
          orderBy: { click: "desc" },
          take: 20,
        })
      : [];

    // Step 4: Find matches in description (lower priority)
    const descriptionMatches =
      searchTerms.length > 0
        ? await prisma.ai.findMany({
            where: {
              OR: [
                ...searchTerms.map((term) => ({
                  shortDesc: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
                ...searchTerms.map((term) => ({
                  longDesc: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
              ],
            },
            include: { kategori: true },
            orderBy: { click: "desc" },
            take: 20,
          })
        : [];

    // Step 5: Combine results without duplicates, maintaining priority order
    const seen = new Set();
    const allResults = [];

    // First add exact name matches
    for (const item of exactNameMatches) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        allResults.push({ ...item, matchType: "name" });
      }
    }

    // Then add category matches
    for (const item of categoryMatches) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        allResults.push({ ...item, matchType: "category" });
      }
    }

    // Finally add description matches
    for (const item of descriptionMatches) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        allResults.push({ ...item, matchType: "description" });
      }
    }

    // If still no results, return some default recommendations
    if (allResults.length === 0) {
      const recommendedTools = await prisma.ai.findMany({
        orderBy: { click: "desc" },
        include: { kategori: true },
        take: 6,
      });

      return NextResponse.json({
        success: true,
        data: recommendedTools.map((tool) => ({
          ...tool,
          matchType: "recommended",
        })),
        message: "No exact matches found. Showing recommended AI tools.",
      });
    }

    return NextResponse.json({
      success: true,
      data: allResults,
      searchTerms,
      categoryName: categoryName || null,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search AI tools",
      },
      { status: 500 }
    );
  }
}
