/*
  Warnings:

  - You are about to alter the column `total_time` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `pic` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `sic` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `solo` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `cross_country` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `sim_imc` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `actual_imc` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `night` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `dual_given` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.
  - You are about to alter the column `dual_recieved` on the `logbook_entries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `logbook_entries` MODIFY `total_time` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `pic` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `sic` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `solo` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `cross_country` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `sim_imc` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `actual_imc` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `night` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `dual_given` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    MODIFY `dual_recieved` DECIMAL(5, 2) NOT NULL DEFAULT 0.00;
