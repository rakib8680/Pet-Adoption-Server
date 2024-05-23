/*
  Warnings:

  - Added the required column `userName` to the `adoption_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_requests" ADD COLUMN     "userContactNumber" TEXT,
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL;
