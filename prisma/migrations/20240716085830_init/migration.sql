-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "authors" TEXT,
    "binding" TEXT,
    "date_published" TEXT,
    "dimensions" TEXT,
    "edition" TEXT,
    "image" TEXT,
    "isbn" TEXT NOT NULL,
    "isbn10" TEXT NOT NULL,
    "isbn13" TEXT NOT NULL,
    "language" TEXT,
    "msrp" DOUBLE PRECISION,
    "pages" INTEGER,
    "publisher" TEXT,
    "subjects" JSONB,
    "synopsis" TEXT,
    "title" TEXT,
    "title_long" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sku" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Book_authorId_idx" ON "Book"("authorId");
