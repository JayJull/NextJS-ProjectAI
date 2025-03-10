// app/api/ai/click/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { aiId } = await request.json();
    
    if (!aiId) {
      return NextResponse.json({ success: false, error: 'AI ID is required' }, { status: 400 });
    }
    
    // Increment the click count for the AI
    await prisma.ai.update({
      where: { id: aiId },
      data: { click: { increment: 1 } }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording click:', error);
    return NextResponse.json({ success: false, error: 'Failed to record click' }, { status: 500 });
  }
}