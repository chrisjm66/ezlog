/*
  Warnings:

  - You are about to drop the column `instructorCid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `instructorExpiryDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isInstructor` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `instructorCid`,
    DROP COLUMN `instructorExpiryDate`,
    DROP COLUMN `isInstructor`,
    ADD COLUMN `instructor_cid` INTEGER UNSIGNED NULL,
    ADD COLUMN `instructor_expiry_date` VARCHAR(15) NULL,
    ADD COLUMN `is_instructor` BOOLEAN NOT NULL DEFAULT false;
