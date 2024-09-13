import User from "@/models/User";
import connectMongo from "@/utils/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { email, password } = await request.json();
    await connectMongo();
    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        // Cria o token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
