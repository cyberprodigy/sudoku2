import Knex from "knex";

const db = Knex({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
});

db.on("query-error", (error: any, obj: any) => {
  console.log({ error, obj });
});

export default db;

export interface DatabaseRecord<T> {
  rows: T[];
}
