import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    datafim: {
        type: Date,
        required: false
    },
    localizacao: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true,
        enum: ['show', 'palestra', 'workshop', 'tarde de autógrafos']  // Define as opções permitidas
    }
});

const Evento = mongoose.models.Evento || mongoose.model('Evento', EventoSchema);

export default Evento;
