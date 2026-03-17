pragma circom 2.0.0;

include "circomlib/circuits/poseidon.circom";

template CredentialVerification() {
    signal input commitment;

    signal input email;
    signal input phone;
    signal input salt;

    component hash = Poseidon(3);
    hash.inputs[0] <== email;
    hash.inputs[1] <== phone;
    hash.inputs[2] <== salt;

    hash.out === commitment;
}

component main = CredentialVerification();