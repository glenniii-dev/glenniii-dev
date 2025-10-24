CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email"),
	CONSTRAINT "admin_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"tags" varchar NOT NULL,
	"content" text NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"comment" text NOT NULL,
	"blogId" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"isApproved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"link" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;