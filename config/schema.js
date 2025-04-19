import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const Users=pgTable('users', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl').notNull(),
    credits:integer('credits').default(3)
})