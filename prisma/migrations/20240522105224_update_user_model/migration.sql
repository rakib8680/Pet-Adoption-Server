/*
  Warnings:

  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "gender" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT 'USER';
