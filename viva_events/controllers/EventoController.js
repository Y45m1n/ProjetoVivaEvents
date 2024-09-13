import Evento from "@/models/Evento";
import connectMongo from "@/utils/mongodb";

// Função para obter eventos por protocolo
export const getEventoByProtocolo = async (protocolo) => {
    await connectMongo();
    return await Evento.findOne({ protocolo });
}

// Função para atualizar um evento existente
export const updateEvento = async (protocolo, data) => {
    await connectMongo();
    return await Evento.findOneAndUpdate({ protocolo }, data, {
        new: true,
        runValidators: true
    });
}

// Função para deletar um evento
export const deleteEvento = async (protocolo) => {
    await connectMongo();
    return await Evento.findOneAndDelete({ protocolo });
}
