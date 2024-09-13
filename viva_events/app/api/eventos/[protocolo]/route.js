import { updateEventoByProtocolo, deleteEventoByProtocolo } from "@/controllers/EventoController";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { protocolo } = params;
    const data = await request.json();
    try {
        const evento = await updateEventoByProtocolo(protocolo, data);
        return NextResponse.json({ success: true, data: evento });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { protocolo } = params;
    try {
        await deleteEventoByProtocolo(protocolo);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
