import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Admin Table
export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  password: varchar("password").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
});

// Projects Table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  link: varchar("link").notNull(),
});

// Blogs Table
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  tags: varchar("tags").notNull(),
  content: text("content").notNull(),
  isPublished: boolean("isPublished").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// Comments
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  comment: text("comment").notNull(),
  blogId: integer("blogId").notNull().references(() => blogs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isApproved: boolean("isApproved").notNull().default(false),
});

// Create relations
export const blogRelations = relations(blogs, 
  ({ many }) => ({
    comments: many(comments),
}));

export const commentRelations = relations(comments, 
  ({ one }) => ({
    blog: one(blogs, { 
      fields: [comments.blogId], 
      references: [blogs.id]
    }),
}));

