import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const todos = db.getTodos();
  return NextResponse.json(todos);
}

export async function POST(request) {
  try {
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' }, 
        { status: 400 }
      );
    }
    const newTodo = db.addTodo(title);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    const updatedTodo = db.updateTodo(id, updates);
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      );
    }
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const success = db.deleteTodo(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}