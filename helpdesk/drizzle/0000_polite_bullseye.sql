CREATE TABLE `tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(60) NOT NULL,
	`order_id` text,
	`product_id` integer,
	`issue_type` text DEFAULT 'other' NOT NULL,
	`description` text,
	`status` text DEFAULT 'open' NOT NULL,
	`priority` text DEFAULT NULL,
	`created_by` text NOT NULL,
	`created_at` integer DEFAULT '"2024-12-18T08:40:52.997Z"' NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `issue_type_idx` ON `tickets` (`status`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `tickets` (`status`);--> statement-breakpoint
CREATE INDEX `priority_idx` ON `tickets` (`priority`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `tickets` (`created_by`);