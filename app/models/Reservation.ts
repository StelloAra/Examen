import { Schema, model, models, Document } from 'mongoose';

// 1. Skapa ett interface för din data
export interface IReservation extends Document {
  customerName: string;
  email: string;
  date: Date;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// 2. Skapa ditt Schema
const ReservationSchema = new Schema<IReservation>({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  service: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

// 3. Exportera modellen
const Reservation = models.Reservation || model<IReservation>('Reservation', ReservationSchema);
export default Reservation;