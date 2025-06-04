/*
  Warnings:

  - You are about to drop the column `addressName` on the `customeraddresses` table. All the data in the column will be lost.
  - You are about to drop the column `stateOrProvince` on the `customeraddresses` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `customeraddresses` table. All the data in the column will be lost.
  - You are about to drop the column `zipOrPostalCode` on the `customeraddresses` table. All the data in the column will be lost.
  - Added the required column `isDefault` to the `CustomerAddresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CustomerAddresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CustomerAddresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `CustomerAddresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `CustomerAddresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customeraddresses` DROP COLUMN `addressName`,
    DROP COLUMN `stateOrProvince`,
    DROP COLUMN `streetAddress`,
    DROP COLUMN `zipOrPostalCode`,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip` VARCHAR(191) NOT NULL;
