"use client";

import { useState } from "react";
import { teachers, type Teacher } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { getInitials, cn } from "@/lib/utils";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2, X } from "lucide-react";

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = teachers.filter(
    (t) =>
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Teachers" description="Manage teaching staff and assignments">
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Teacher
        </button>
      </PageHeader>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or department..."
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Employee ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Designation</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Subjects</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((teacher) => (
              <tr key={teacher.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{teacher.employeeId}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-xs font-bold text-success">
                      {getInitials(`${teacher.firstName} ${teacher.lastName}`)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{teacher.firstName} {teacher.lastName}</p>
                      <p className="text-xs text-muted-foreground">{teacher.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{teacher.department}</td>
                <td className="px-4 py-3 text-foreground">{teacher.designation}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((s) => (
                      <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{teacher.phone}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                    teacher.status === "active" && "bg-success/10 text-success",
                    teacher.status === "on-leave" && "bg-warning/10 text-warning",
                    teacher.status === "inactive" && "bg-destructive/10 text-destructive"
                  )}>
                    {teacher.status === "on-leave" ? "On Leave" : teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === teacher.id ? null : teacher.id)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"
                      aria-label="Teacher actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenuId === teacher.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-border bg-card p-1 shadow-lg">
                          <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-foreground hover:bg-accent">
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                          <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-foreground hover:bg-accent">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No teachers found matching your search.
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filtered.length} of {teachers.length} teachers
      </p>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowDialog(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add New Teacher</h2>
              <button onClick={() => setShowDialog(false)} className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowDialog(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input type="email" className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Mathematics</option><option>Science</option><option>English</option>
                    <option>Social Studies</option><option>Computer Science</option><option>Physical Education</option>
                    <option>Arts</option><option>Languages</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Designation</label>
                  <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Teacher</option><option>Senior Teacher</option><option>Head of Department</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input type="tel" className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDialog(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
