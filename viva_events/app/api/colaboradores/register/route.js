import Colaborador from "@/models/Colaborador";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { nome, email, senha } = await request.json();
    await connectMongo();
    try {
        // Cria um novo colaborador com nome, email e senha
        const colaborador = await Colaborador.create({ nome, email, senha });
        return NextResponse.json({ success: true, data: colaborador });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
