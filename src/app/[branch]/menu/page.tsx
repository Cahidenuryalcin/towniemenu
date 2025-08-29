import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

type Row = {
  category_name: string;
  item_id: string;
  item_name: string;
  item_desc: string | null;
  price: number | null;
  currency: string | null;
  variant: string | null;
  available: boolean | null;
};

export default async function BranchMenu({
  params,
}: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;

  const { data, error } = await supabase
    .from("v_menu_items")
    .select(
      "category_name,item_id,item_name,item_desc,price,currency,variant,available"
    )
    .eq("branch_slug", branch)
    .order("category_name", { ascending: true });

  if (error) {
    return <main className="p-6 text-red-600">Hata: {error.message}</main>;
  }

  const rows: Row[] = (data ?? []) as Row[];
  const groups = new Map<string, Row[]>();
  for (const row of rows) {
    const key = row.category_name || "Diğer";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 mb-6">
        <h1 className="text-2xl font-bold">Menü · {branch.toUpperCase()}</h1>
        <p className="text-sm text-gray-200">Klasik banner alanı</p>
      </div>

      {rows.length === 0 && <p>Henüz ürün yok.</p>}

      {[...groups.entries()].map(([cat, items]) => (
        <section key={cat} className="mb-5">
          <h2 className="text-lg font-semibold mb-2">{cat}</h2>
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.item_id + (it.variant || "")}
                className="flex items-start justify-between rounded-xl border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {it.item_name}
                    {it.available === false && (
                      <span className="ml-2 text-xs rounded bg-gray-100 px-2 py-0.5">
                        Mevcut değil
                      </span>
                    )}
                    {it.variant && (
                      <span className="ml-2 text-xs rounded bg-gray-100 px-2 py-0.5">
                        {it.variant}
                      </span>
                    )}
                  </h3>
                  {it.item_desc && (
                    <p className="text-sm text-gray-600">{it.item_desc}</p>
                  )}
                </div>
                <div className="font-bold whitespace-nowrap">
                  {it.price != null ? `${it.price} ${it.currency || "TRY"}` : "-"}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
