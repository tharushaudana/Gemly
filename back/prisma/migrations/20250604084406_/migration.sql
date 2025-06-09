/*
  Warnings:

  - You are about to drop the column `productCount` on the `collection` table. All the data in the column will be lost.
  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `collection` DROP COLUMN `productCount`;
