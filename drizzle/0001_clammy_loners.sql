ALTER TABLE "admin" DROP CONSTRAINT "admin_phone_unique";--> statement-breakpoint
ALTER TABLE "admin" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin" DROP COLUMN "phone";