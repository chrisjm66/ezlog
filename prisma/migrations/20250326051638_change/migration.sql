/*
  Warnings:

  - You are about to alter the column `instructor_cid` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `instructor_cid` VARCHAR(191) NULL;
