import connectDB from '@/lib/mongodb';
import Reservation from '../../models/Reservation';
import { NextResponse } from 'next/server';

// 1. GET - Hämtar alla bokningar (för Admin-sidan)
export async function GET() {
  try {
    await connectDB();
    // Vi hämtar alla och sorterar så att de nyaste datumen kommer först
    const reservations = await Reservation.find({}).sort({ date: -1 });
    return NextResponse.json(reservations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. POST - Skapar en ny bokning (från ditt formulär)
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Skapar bokningen i MongoDB
    const newReservation = await Reservation.create(body);
    
    return NextResponse.json({ success: true, data: newReservation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}