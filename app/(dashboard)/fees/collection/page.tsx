"use client";

import { useState } from "react";
import { feePayments, type FeePayment } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { formatCurrency, cn } from "@/lib/utils";
import { Search, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FeeCollectionPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = feePayments.filter((p) => {
    const matchesSearch = p.studentName.toLowerCase().includes(search.toLowerCase()) || p.receiptNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = feePayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = feePayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = feePayments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="mb-2">
        <Link href="/fees" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Fee Structure
        </Link>
      </div>

      <PageHeader title="Fee Collection" description="Track and manage fee payments">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Collected</p>
          <p className="mt-1 text-2xl font-bold text-success">{formatCurrency(totalCollected)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-1 text-2xl font-bold text-warning">{formatCurrency(totalPending)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="mt-1 text-2xl font-bold text-destructive">{formatCurrency(totalOverdue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or receipt..."
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Receipt No</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Method</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Paid Date</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => (
              <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{payment.receiptNo || "-"}</td>
                <td className="px-4 py-3 font-medium text-foreground">{payment.studentName}</td>
                <td className="px-4 py-3 text-foreground">{payment.className}</td>
                <td className="px-4 py-3 text-right font-medium text-foreground">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-3 text-foreground">{payment.method}</td>
                <td className="px-4 py-3 text-foreground">{payment.paidDate || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    payment.status === "paid" && "bg-success/10 text-success",
                    payment.status === "pending" && "bg-warning/10 text-warning",
                    payment.status === "overdue" && "bg-destructive/10 text-destructive"
                  )}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No payments found.</div>
        )}
      </div>
    </div>
  );
}
