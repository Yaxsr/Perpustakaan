export class CreateBookDto {
  ISBN: string;
  Judul_Buku: string;
  Penulis: string;
  Tahun_Terbit: number;
  Synopsis: string;
  Genre: string;
  Lemari: string;
  Jumlah_Buku: number;

  // imagePath: string; // Add this line for the image property
}
