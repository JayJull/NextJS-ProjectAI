import { NextResponse } from 'next/server';
import { createInitialAdmin } from '@/lib/data';

export async function GET() {
  const result = await createInitialAdmin();
  
  return NextResponse.json(result);
}