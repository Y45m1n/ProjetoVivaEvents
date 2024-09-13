import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ColaboradorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: true
    }
});

// Hash a senha antes de salvar
ColaboradorSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para comparar senhas
ColaboradorSchema.methods.compareSenha = function (senhaCandidata) {
    return bcrypt.compare(senhaCandidata, this.senha);
};

const Colaborador = mongoose.models.Colaborador || mongoose.model('Colaborador', ColaboradorSchema);

export default Colaborador;
