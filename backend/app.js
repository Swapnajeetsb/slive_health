const bcrypt = require("bcryptjs");

async function hashPassword() {
  const hashed = await bcrypt.hash("admin123", 12);

  console.log(hashed);
}

hashPassword();