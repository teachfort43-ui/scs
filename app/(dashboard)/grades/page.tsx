"use client";

import { useState, useMemo } from "react";
import { gradeRecords } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const uniqueClasses = [...new Set(gradeRecords.map((g) => g.className))];
  const uniqueSubjects = [...new Set(gradeRecords.map((g) => g.subject))];

  const filtered = useMemo(() => {
    return gradeRecords.filter((g) => {
      if (selectedClass !== "all" && g.className !== selectedClass) return false;
      if (selectedSubject !== "all" && g.subject !== selectedSubject) return false;
      return true;
    });
  }, [selectedClass, selectedSubject]);

  const avgTotal = filtered.length > 0
    ? Math.round(filtered.reduce((sum, g) => sum + g.total, 0) / filtered.length)
    : 0;

  return (
    <div>
      <PageHeader title="Grades" description="View and manage student grade records">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Classes</option>
            {uniqueClasses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Subjects</option>
            {uniqueSubjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Term</label>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Term 1 (2024-2025)</option>
            <option>Term 2 (2024-2025)</option>
          </select>
        </div>
        <div className="ml-auto rounded-lg bg-primary/5 px-4 py-2 text-center">
          <p className="text-lg font-bold text-primary">{avgTotal}</p>
          <p className="text-xs text-muted-foreground">Avg Score</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Subject</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Classwork (25)</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Homework (25)</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Midterm (25)</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Final (25)</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Total (100)</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((grade) => (
              <tr key={grade.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{grade.studentName}</td>
                <td className="px-4 py-3 text-foreground">{grade.className}</td>
                <td className="px-4 py-3 text-foreground">{grade.subject}</td>
                <td className="px-4 py-3 text-center text-foreground">{grade.classwork}</td>
                <td className="px-4 py-3 text-center text-foreground">{grade.homework}</td>
                <td className="px-4 py-3 text-center text-foreground">{grade.midterm}</td>
                <td className="px-4 py-3 text-center text-foreground">{grade.final}</td>
                <td className="px-4 py-3 text-center font-semibold text-foreground">{grade.total}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    grade.grade.startsWith("A") ? "bg-success/10 text-success" :
                    grade.grade.startsWith("B") ? "bg-primary/10 text-primary" :
                    grade.grade === "C" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  )}>
                    {grade.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No grade records found.</div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filtered.length} records
      </p>
    </div>
  );
}
