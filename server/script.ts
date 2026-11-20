import { db } from "./src/prisma/db.ts";

async function main() {
  const created = await db.orm.users.create({
    email: "john@example.com",
    name: "John",
  });
  console.log("Created:", created);

  const users = await db.orm.users.all();
  console.log("All users:", users);

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
