-- CreateTable
CREATE TABLE "academic_years" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_years_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
