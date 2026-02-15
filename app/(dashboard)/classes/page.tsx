"use client";

import { useState } from "react";
import { classes } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { Plus, Users, DoorOpen, GraduationCap, X } from "lucide-react";

export default function ClassesPage() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <PageHeader title="Classes" description="Manage school classes and sections">
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Class
        </button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{cls.name}</h3>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {cls.sections.length} {cls.sections.length === 1 ? "Section" : "Sections"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" />
                <span>{cls.studentCount} Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span>{cls.classTeacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DoorOpen className="h-4 w-4 shrink-0" />
                <span>Room {cls.room}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {cls.sections.map((sec) => (
                <span
                  key={sec}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-xs font-medium text-foreground"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowDialog(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add New Class</h2>
              <button onClick={() => setShowDialog(false)} className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowDialog(false); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Class Name</label>
                <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Class 5" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Sections</label>
                <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="A, B, C" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Class Teacher</label>
                <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Select a teacher</option>
                  <option>Dr. Sarah Mitchell</option><option>Emily Rodriguez</option>
                  <option>John Campbell</option><option>David Kim</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Room Number</label>
                <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 1-05" />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDialog(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Class</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
