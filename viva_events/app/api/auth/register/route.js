import User from "@/models/User";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, password } = await request.json();
    await connectMongo();
    try {
        // Cria um novo usuário com nome, email e senha
        const user = await User.create({ name, email, password });
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
