"use client";

import { useState } from "react";
import { subjects } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Plus, Search, X } from "lucide-react";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Subjects" description="Manage curriculum subjects and assignments">
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Subject
        </button>
      </PageHeader>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code, or department..."
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Classes</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Teacher</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Credits</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((subject) => (
              <tr key={subject.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{subject.code}</td>
                <td className="px-4 py-3 font-medium text-foreground">{subject.name}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    subject.type === "Core" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                  )}>
                    {subject.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground">{subject.department}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {subject.classes.slice(0, 3).map((c) => (
                      <span key={c} className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{c}</span>
                    ))}
                    {subject.classes.length > 3 && (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                        +{subject.classes.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{subject.teacher}</td>
                <td className="px-4 py-3 text-center text-foreground">{subject.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No subjects found.</div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filtered.length} of {subjects.length} subjects
      </p>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowDialog(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add New Subject</h2>
              <button onClick={() => setShowDialog(false)} className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowDialog(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Subject Code</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. MATH-201" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Subject Name</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Core</option><option>Elective</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Credits</label>
                  <input type="number" min="1" max="6" className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Department</label>
                <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Mathematics</option><option>Science</option><option>English</option>
                  <option>Social Studies</option><option>Computer Science</option><option>Arts</option><option>Languages</option>
                </select>
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDialog(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
