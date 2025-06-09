-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paymentMd5Sig` VARCHAR(191) NOT NULL DEFAULT '';
