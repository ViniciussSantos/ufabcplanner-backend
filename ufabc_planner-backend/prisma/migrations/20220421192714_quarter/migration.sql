-- CreateTable
CREATE TABLE "quarters" (
    "id" TEXT NOT NULL,
    "academy_year_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "quarters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quarters" ADD CONSTRAINT "quarters_academy_year_id_fkey" FOREIGN KEY ("academy_year_id") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
