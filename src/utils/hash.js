import bcrypt from "bcryptjs";

export async function hashPass(pass) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);

    return hash;
}

export async function compareHash(pass, hash) {
    const valid = await bcrypt.compare(pass, hash);
    
    return valid;
}