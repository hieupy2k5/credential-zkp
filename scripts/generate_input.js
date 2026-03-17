const { buildPoseidon } = require("circomlibjs");

async function main() {
    const poseidon = await buildPoseidon();

    const email = 123456;
    const phone = 987654;
    const salt = 111;

    const hash = poseidon([email, phone, salt]);
    const commitment = poseidon.F.toString(hash);

    console.log(JSON.stringify({
        email: email.toString(),
        phone: phone.toString(),
        salt: salt.toString(),
        commitment: commitment
    }, null, 2));
}

main();