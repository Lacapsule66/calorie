import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};

export const reservation = pgTable("Reservation", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  details: json("details").notNull(),
  hasCompletedPayment: boolean("hasCompletedPayment").notNull().default(false),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Reservation = InferSelectModel<typeof reservation>;
export const aliments = pgTable("Aliment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(), // UUID unique pour chaque aliment
  aliment: text("aliment").notNull(), // Nom de l'aliment
  calories: integer("calories").notNull(), // Calories de l'aliment
  glucides: integer("glucides").notNull(), // Glucides de l'aliment
  lipides: integer("lipides").notNull(), // Lipides de l'aliment
  proteines: integer("proteines").notNull(), // Protéines de l'aliment

  // Clé étrangère vers `User`
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
});

export type Aliment = InferSelectModel<typeof aliments>;
