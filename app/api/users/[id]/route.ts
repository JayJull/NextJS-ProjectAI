// File: app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// PUT /api/users/[id] - Update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username) {
      return NextResponse.json(
        { message: 'Username harus diisi' },
        { status: 400 }
      );
    }

    // Check if the new username is already taken by another user
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          id: { not: id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: 'Username sudah digunakan' },
          { status: 400 }
        );
      }
    }

    // Update data object
    const updateData: any = { username };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memperbarui user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'User berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menghapus user' },
      { status: 500 }
    );
  }
}