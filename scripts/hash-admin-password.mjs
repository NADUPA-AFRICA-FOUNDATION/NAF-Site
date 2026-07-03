#!/usr/bin/env node
// Generates an ADMIN_PASSWORD_HASH value (scrypt) for .env / Vercel.
//
// Usage:  node scripts/hash-admin-password.mjs
// Prompts for the password so it never lands in shell history.
// Paste the printed line into your environment and remove ADMIN_PASSWORD.
import crypto from "node:crypto"
import readline from "node:readline"

const rl = readline.createInterface({ input: process.stdin, output: process.stderr })

rl.question("Password to hash (input is visible): ", (password) => {
  rl.close()
  if (!password) {
    console.error("No password given.")
    process.exit(1)
  }
  const salt = crypto.randomBytes(16)
  const key = crypto.scryptSync(password, salt, 64)
  console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${key.toString("hex")}`)
})
