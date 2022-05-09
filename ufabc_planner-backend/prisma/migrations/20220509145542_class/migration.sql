-- CreateEnum
CREATE TYPE "biweekly_type" AS ENUM ('week1', 'week2');

-- CreateEnum
CREATE TYPE "weekdays" AS ENUM ('seg', 'ter', 'quar', 'quin', 'sex', 'sab', 'dom');

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "professor" TEXT,
    "room" TEXT,
    "campus" TEXT,
    "building" TEXT,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "weekday" "weekdays" NOT NULL,
    "biweekly_type" "biweekly_type",
    "subject_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
