/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `logbook_entries` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `logbook_entries_instructors_instructor_id_fk` ON `logbook_entries`;

-- AlterTable
ALTER TABLE `logbook_entries` DROP COLUMN `instructor_id`,
    ADD COLUMN `instructor_cid` VARCHAR(15) NULL,
    ADD COLUMN `instructor_expiry_date` VARCHAR(10) NULL,
    ADD COLUMN `instructor_user_id` INTEGER UNSIGNED NULL,
    MODIFY `aircraft_id` INTEGER UNSIGNED NULL;

-- CreateIndex
CREATE INDEX `logbook_entries_users_user_id_fk_2` ON `logbook_entries`(`instructor_user_id`);
