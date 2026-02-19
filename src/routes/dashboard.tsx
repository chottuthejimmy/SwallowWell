import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageShell, SectionCard } from "@/components/ui";
import { useAppData } from "@/lib/appData";
import type { DailyLogEntry } from "@/lib/types";

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function DashboardPage() {
  const { data } = useAppData();
  const dailyLogs = data?.dailyLogs ?? [];

  const recentLogs = useMemo(() => dailyLogs.slice(-7), [dailyLogs]);
  const chartData = useMemo(
    () =>
      recentLogs.map((log) => ({
        day: formatShortDate(log.createdAt),
        hydration: log.hydrationMl,
        coughEpisodes: log.coughEpisodes,
        meals: log.toleratedMeals
      })),
    [recentLogs]
  );

  const avgHydration = recentLogs.length
    ? Math.round(recentLogs.reduce((sum, item) => sum + item.hydrationMl, 0) / recentLogs.length)
    : 0;
  const avgCoughEpisodes = recentLogs.length
    ? Number((recentLogs.reduce((sum, item) => sum + item.coughEpisodes, 0) / recentLogs.length).toFixed(1))
    : 0;
  const avgMeals = recentLogs.length
    ? Number((recentLogs.reduce((sum, item) => sum + item.toleratedMeals, 0) / recentLogs.length).toFixed(1))
    : 0;

  const columnHelper = createColumnHelper<DailyLogEntry>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => new Date(info.getValue()).toLocaleString()
      }),
      columnHelper.accessor("hydrationMl", { header: "Hydration (ml)" }),
      columnHelper.accessor("toleratedMeals", { header: "Meals" }),
      columnHelper.accessor("coughEpisodes", { header: "Cough Episodes" }),
      columnHelper.accessor("energyLevel", { header: "Energy (0-10)" })
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: [...dailyLogs].reverse(),
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <PageShell>
      <section className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Avg Hydration (7 logs)">
          <p className="text-3xl font-black text-slate-900">{avgHydration} ml</p>
        </SectionCard>
        <SectionCard title="Avg Cough Episodes">
          <p className="text-3xl font-black text-slate-900">{avgCoughEpisodes}</p>
        </SectionCard>
        <SectionCard title="Avg Tolerated Meals">
          <p className="text-3xl font-black text-slate-900">{avgMeals}</p>
        </SectionCard>
      </section>

      <section className="mt-6">
        <SectionCard
          title="Progress Trend"
          subtitle="Hydration and cough episodes from your latest 7 logs."
        >
          {chartData.length ? (
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="hydrationFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="coughFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="hydration"
                    stroke="#0d9488"
                    fillOpacity={1}
                    fill="url(#hydrationFill)"
                    name="Hydration (ml)"
                  />
                  <Area
                    type="monotone"
                    dataKey="coughEpisodes"
                    stroke="#f97316"
                    fillOpacity={1}
                    fill="url(#coughFill)"
                    name="Cough Episodes"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="rounded-xl bg-slate-100 p-4 text-slate-700">
              No logs yet. Visit Daily Toolkit to add entries and unlock this chart.
            </p>
          )}
        </SectionCard>
      </section>

      <section className="mt-6">
        <SectionCard title="Log History" subtitle="Built with TanStack Table for clear history review.">
          {dailyLogs.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-slate-200 text-left">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-3 py-2 text-xs font-bold uppercase text-slate-600">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3 py-2 text-sm text-slate-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl bg-slate-100 p-4 text-slate-700">No log history yet.</p>
          )}
        </SectionCard>
      </section>
    </PageShell>
  );
}
