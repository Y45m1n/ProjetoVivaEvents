import { updateEvento, deleteEvento } from "@/controllers/EventoController";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const data = await request.json();
    try {
        const evento = await updateEvento(id, data);
        return NextResponse.json({ success: true, data: evento });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await deleteEvento(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
