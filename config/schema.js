import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { varbinary } from "drizzle-orm/mysql-core";

export const Users=pgTable('users', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl').notNull(),
    credits:integer('credits').default(3)
})
// create new table in drizzle
export const AiGeneratedImage=pgTable('aigeneratedimage', {
    id:serial('id').primaryKey(),
    roomType:varchar('roomType').notNull(),
    designType:varchar('designType').notNull(),
    ogImage:varchar('ogImage').notNull(),
    aiImage:varchar('aiImage').notNull(),
    userEmail:varchar('userEmail')
})