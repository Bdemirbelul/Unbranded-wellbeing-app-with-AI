import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { mockSyncRuns } from "@/lib/mock";



const sources = [

  { name: "Apple Health", status: "Connected", note: "HRV, RHR, Sleep (mock)" },

  { name: "Android Health Connect", status: "Not connected", note: "Steps, Sleep (mock)" },

  { name: "Oura", status: "Connected", note: "Sleep staging (mock)" }

] as const;



export default function SourcesPage() {

  const runs = mockSyncRuns();

  return (

    <div className="space-y-6">

      <div>

        <div className="text-sm text-muted-foreground">Integrations</div>

        <h1 className="text-2xl font-semibold tracking-tight">Data Sources</h1>

      </div>



      <div className="grid gap-4 lg:grid-cols-3">

        {sources.map((s) => (

          <Card key={s.name} className="rounded-2xl p-5">

            <div className="flex items-start justify-between gap-3">

              <div>

                <div className="font-medium">{s.name}</div>

                <div className="mt-1 text-sm text-muted-foreground">{s.note}</div>

              </div>

              <Badge variant="secondary" className="rounded-full">{s.status}</Badge>

            </div>

            <div className="mt-4 flex gap-2">

              <Button className="rounded-2xl">Manage</Button>

              <Button variant="outline" className="rounded-2xl">Sync now</Button>

            </div>

            <div className="mt-4 text-xs text-muted-foreground">

              Last sync: 2026-01-14 09:12 (mock)

            </div>

          </Card>

        ))}

      </div>



      <Card className="rounded-2xl p-5">

        <div className="flex items-center justify-between">

          <div className="font-medium">Sync runs</div>

          <Badge variant="secondary" className="rounded-full">Mock logs</Badge>

        </div>



        <div className="mt-4 overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="text-left text-muted-foreground">

              <tr className="border-b">

                <th className="py-2">Run</th>

                <th className="py-2">Started</th>

                <th className="py-2">Status</th>

                <th className="py-2">Imported</th>

                <th className="py-2">Errors</th>

              </tr>

            </thead>

            <tbody>

              {runs.map((r) => (

                <tr key={r.id} className="border-b last:border-0">

                  <td className="py-2 font-medium">{r.id}</td>

                  <td className="py-2 text-muted-foreground">{r.startedAt}</td>

                  <td className="py-2">

                    <Badge variant="secondary" className="rounded-full">{r.status}</Badge>

                  </td>

                  <td className="py-2">{r.imported}</td>

                  <td className="py-2">{r.errors}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

    </div>

  );

}

