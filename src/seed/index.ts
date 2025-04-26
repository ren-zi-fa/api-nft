import { db } from "../config/firebase";

async function seed() {
  const products = [
    {
      author: "champ sosis ayam",
      avatar: ":sjhdjs",
      nft_image: "nft imashgahs ",
      price: "4asasa",
    },
  ];

  const batch = db.batch();

  products.forEach((product) => {
    const docRef = db.collection("nft-market").doc();
    batch.set(docRef, product);
  });

  try {
    await batch.commit();
    console.log("✅ Seeding selesai!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Gagal seeding:", err);
    process.exit(1);
  }
}

seed();
