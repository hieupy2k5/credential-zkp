# Zero-Knowledge Credential System

## Overview

This project implements a privacy-preserving credential verification system using Zero-Knowledge Proofs (ZKP). It enables a user to prove possession of sensitive information (for example, email and phone number) without disclosing the underlying data.

The system is implemented with Circom (circuit design) and the Groth16 proving system for proof generation and verification.

---

## Motivation

In many real-world systems, users must disclose personal information for authentication or verification. This increases privacy risks and enlarges the attack surface for data breaches.

This project demonstrates how Zero-Knowledge Proofs can be applied to:
- Preserve user privacy
- Ensure integrity of privately held attributes
- Enable secure verification without disclosure of sensitive inputs

---

## Core Idea

Instead of storing or transmitting raw attributes, the system computes a cryptographic commitment:

```
commitment = Poseidon(email, phone, salt)
```

Where:
- `email`, `phone` are private inputs
- `salt` is a random nonce to mitigate brute-force attacks
- `Poseidon` is a hash function optimized for ZKP-friendly circuits

The prover generates a proof that they know `(email, phone, salt)` such that:

```
Poseidon(email, phone, salt) = commitment
```

without revealing any of the inputs.

---

## System Architecture

Components:
- Prover: Generates a proof from private inputs and witness data
- Verifier: Validates the proof against public inputs (e.g., the commitment)
- Circuit: Encodes the arithmetic constraints in Circom
- Trusted setup: Produces proving and verification keys for Groth16

Typical workflow:

1. User computes `commitment` from private data
2. Witness is derived from the private inputs and salt
3. Prover generates a Groth16 proof
4. Verifier checks the proof against the commitment

---

## Technology Stack

- Circom (circuit design)
- snarkjs (trusted-setup, proof generation and verification)
- Node.js (scripts and automation)
- Poseidon hash function (ZKP-optimized hash)

---

## Project Structure

```
credential-zkp/
├── circuits/
│   └── credential.circom
├── scripts/
│   └── generate_input.js
├── inputs/
│   └── input.json
├── credential_js/
│   └── generate_witness.js
├── package.json
├── credential.r1cs
├── credential.zkey
└── README.md
```

---

## Setup and Usage

### Install dependencies

```bash
npm install
```

### Generate input

```bash
npm run input
```

### Compile circuit

```bash
npm run build
```

### Generate witness

```bash
npm run witness
```

### Trusted setup (run once)

```bash
npm run setup
```

### Generate proof

```bash
npm run prove
```

### Verify proof

```bash
npm run verify
```

---

## Results

The system demonstrates the following properties:
- Valid proof generation for committed private inputs
- Correct proof verification against public commitments
- Confidentiality of private inputs during verification

A successful verification typically returns:

```
[INFO] snarkJS: OK!
```

---

## Security Considerations

- Private inputs are not revealed during verification
- Salt reduces the feasibility of offline brute-force attacks
- The trusted setup ceremony must be performed and stored securely to avoid setup compromise

---

## Limitations

- Requires a trusted setup phase (Groth16)
- Does not include credential revocation mechanisms
- No issuer-based signature scheme is integrated
- Not yet integrated with external identity systems or key management

---

## Future Work

- Integrate Merkle trees for scalable credential registries
- Add selective disclosure primitives for partial attribute proofs
- Incorporate issuer signatures to create verifiable credentials
- Provide optional on-chain verification adapters for blockchain platforms
