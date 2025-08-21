import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const todos = db.getTodos();
    const response = NextResponse.json(todos);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json();
    
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' }, 
        { status: 400 }
      );
    }
    
    const newTodo = db.addTodo(title.trim());
    return NextResponse.json(newTodo, { status: 201 });
    
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' }, 
        { status: 400 }
      );
    }
    
    const updatedTodo = db.updateTodo(id, updates);
    
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTodo);
    
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' }, 
        { status: 400 }
      );
    }
    
    const success = db.deleteTodo(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}