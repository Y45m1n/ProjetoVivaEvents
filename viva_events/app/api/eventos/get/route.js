import Evento from "@/models/Evento";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    try {
        // Obtém todos os eventos
        const eventos = await Evento.find({});
        return NextResponse.json({ success: true, data: eventos });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
