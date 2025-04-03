/*
  Warnings:

  - The `instructor_signature` column on the `logbook_entries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `logbook_entries` DROP COLUMN `instructor_signature`,
    ADD COLUMN `instructor_signature` JSON NULL;
