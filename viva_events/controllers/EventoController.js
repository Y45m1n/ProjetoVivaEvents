import Evento from "@/models/Evento";
import connectMongo from "@/utils/dbConnect";

// Função para obter todos os eventos ou eventos específicos
export const getEventos = async (filters = {}) => {
    await connectMongo();
    return await Evento.find(filters);
}

// Função para criar um novo evento
export const createEvento = async (data) => {
    await connectMongo();
    return await Evento.create(data);
}

// Função para atualizar um evento existente
export const updateEvento = async (id, data) => {
    await connectMongo();
    return await Evento.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
}

// Função para deletar um evento
export const deleteEvento = async (id) => {
    await connectMongo();
    return await Evento.findByIdAndDelete(id);
}
