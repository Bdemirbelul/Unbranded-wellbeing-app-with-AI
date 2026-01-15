"use client";



import { Card } from "@/components/ui/card";

import {

  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip

} from "recharts";



export function ChartCard({

  title,

  data,

  dataKey,

  yLabel

}: {

  title: string;

  data: any[];

  dataKey: string;

  yLabel?: string;

}) {

  return (

    <Card className="rounded-2xl p-5">

      <div className="mb-3 flex items-baseline justify-between">

        <div className="font-medium">{title}</div>

        {yLabel ? <div className="text-xs text-muted-foreground">{yLabel}</div> : null}

      </div>



      <div className="h-[260px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <XAxis dataKey="date" tickMargin={8} fontSize={12} />

            <YAxis tickMargin={8} fontSize={12} />

            <Tooltip />

            <Line type="monotone" dataKey={dataKey} strokeWidth={2} dot={false} />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </Card>

  );

}

