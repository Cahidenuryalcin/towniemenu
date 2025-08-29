import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="rounded-2xl bg-gray-900 text-white p-6 mb-6">
        <h1 className="text-2xl font-bold">☕ Townie Cafe</h1>
        <p className="text-sm text-gray-200">Şube seçin ve menüyü görüntüleyin.</p>
      </div>

      <div className="grid gap-3">
        <Link href="/yalova/menu" className="rounded-xl border p-4 hover:bg-gray-50">
          Yalova Menü
        </Link>
        <Link href="/bursa/menu" className="rounded-xl border p-4 hover:bg-gray-50">
          Bursa Menü
        </Link>
      </div>
    </main>
  );
}
