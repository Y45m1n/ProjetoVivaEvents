import mongoose from 'mongoose';

const EventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    datafim: {
        type: Date,
        required: true
    },
    localizacao: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    protocolo: {
        type: String,
        unique: true,
        required: true,
    }
});

// Gerar um protocolo único antes de salvar o evento
EventoSchema.pre('save', async function (next) {
    if (!this.isModified('protocolo')) {
        // Se o protocolo já está definido, pular a geração
        return next();
    }
    
    const gerarProtocoloUnico = async () => {
        const protocoloGerado = `PROTOCOLO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const protocoloExiste = await mongoose.models.Evento.findOne({ protocolo: protocoloGerado });
        if (protocoloExiste) {
            return gerarProtocoloUnico(); // Se o protocolo já existir, gerar outro
        }
        return protocoloGerado;
    };

    this.protocolo = await gerarProtocoloUnico();
    next();
});

const Evento = mongoose.models.Evento || mongoose.model('Evento', EventoSchema);

export default Evento;
