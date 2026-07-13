-- CreateTable
CREATE TABLE "ProductSaleMunicipality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    CONSTRAINT "ProductSaleMunicipality_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nameEs" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionEs" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "priceCop" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "originCity" TEXT NOT NULL DEFAULT 'Bucaramanga',
    "originDepartment" TEXT NOT NULL DEFAULT 'Santander',
    "isInternational" BOOLEAN NOT NULL DEFAULT false,
    "originCountry" TEXT,
    "size" TEXT,
    "warranty" BOOLEAN NOT NULL DEFAULT false,
    "warrantyDuration" TEXT,
    "margin" REAL NOT NULL DEFAULT 5.0,
    "saleZone" TEXT NOT NULL DEFAULT 'nacional',
    "categoryId" TEXT NOT NULL,
    "producerId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("available", "categoryId", "descriptionEn", "descriptionEs", "featured", "id", "imageUrl", "isInternational", "margin", "nameEn", "nameEs", "originCity", "originCountry", "originDepartment", "priceCop", "producerId", "size", "slug", "warranty", "warrantyDuration") SELECT "available", "categoryId", "descriptionEn", "descriptionEs", "featured", "id", "imageUrl", "isInternational", "margin", "nameEn", "nameEs", "originCity", "originCountry", "originDepartment", "priceCop", "producerId", "size", "slug", "warranty", "warrantyDuration" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
