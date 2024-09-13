import Colaborador from "@/models/Colaborador";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { email, senha } = await request.json();
    await connectMongo();
    try {
        // Verifica se o colaborador existe
        const colaborador = await Colaborador.findOne({ email });
        if (!colaborador || !(await colaborador.compareSenha(senha))) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        // Cria o token JWT
        const token = jwt.sign({ colaboradorId: colaborador._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
