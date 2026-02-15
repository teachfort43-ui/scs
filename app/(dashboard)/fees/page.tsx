"use client";

import { feeStructures } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export default function FeesPage() {
  const totalRevenue = feeStructures.reduce((sum, f) => sum + f.totalFee, 0);

  return (
    <div>
      <PageHeader title="Fee Structure" description="View fee breakdown by class">
        <Link
          href="/fees/collection"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <CreditCard className="h-4 w-4" />
          Fee Collection
        </Link>
      </PageHeader>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Tuition</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Lab</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Library</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Sports</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Transport</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {feeStructures.map((fee) => (
              <tr key={fee.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{fee.className}</td>
                <td className="px-4 py-3 text-right text-foreground">{formatCurrency(fee.tuitionFee)}</td>
                <td className="px-4 py-3 text-right text-foreground">{fee.labFee > 0 ? formatCurrency(fee.labFee) : "-"}</td>
                <td className="px-4 py-3 text-right text-foreground">{formatCurrency(fee.libraryFee)}</td>
                <td className="px-4 py-3 text-right text-foreground">{formatCurrency(fee.sportsFee)}</td>
                <td className="px-4 py-3 text-right text-foreground">{formatCurrency(fee.transportFee)}</td>
                <td className="px-4 py-3 text-right font-semibold text-primary">{formatCurrency(fee.totalFee)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
