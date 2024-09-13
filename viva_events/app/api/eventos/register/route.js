import Evento from "@/models/Evento";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { nome, datafim, localizacao, descricao, categoria } = await request.json();
    await connectMongo();
    try {
        // Cria um novo evento com nome, datafim, localizacao, descricao e categoria
        const evento = await Evento.create({ nome, datafim, localizacao, descricao, categoria });
        return NextResponse.json({ success: true, data: evento });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
