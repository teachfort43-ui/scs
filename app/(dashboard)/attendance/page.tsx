"use client";

import { useState, useMemo } from "react";
import { students, classes } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { getInitials, cn } from "@/lib/utils";
import { CalendarCheck, Save, Check, X as XIcon, Clock, AlertCircle } from "lucide-react";

type AttendanceStatus = "present" | "absent" | "late" | "excused";

const statusConfig: Record<AttendanceStatus, { label: string; color: string; icon: typeof Check }> = {
  present: { label: "Present", color: "bg-success/10 text-success border-success/30", icon: Check },
  absent: { label: "Absent", color: "bg-destructive/10 text-destructive border-destructive/30", icon: XIcon },
  late: { label: "Late", color: "bg-warning/10 text-warning border-warning/30", icon: Clock },
  excused: { label: "Excused", color: "bg-primary/10 text-primary border-primary/30", icon: AlertCircle },
};

export default function AttendancePage() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [selectedClass, setSelectedClass] = useState("c6");
  const [selectedSection, setSelectedSection] = useState("A");

  const classStudents = useMemo(
    () => students.filter((s) => s.classId === selectedClass && s.section === selectedSection),
    [selectedClass, selectedSection]
  );

  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const init: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      init[s.id] = Math.random() > 0.15 ? "present" : Math.random() > 0.5 ? "late" : "absent";
    });
    return init;
  });

  const toggleStatus = (studentId: string) => {
    const order: AttendanceStatus[] = ["present", "absent", "late", "excused"];
    const current = attendance[studentId] || "present";
    const next = order[(order.indexOf(current) + 1) % order.length];
    setAttendance((a) => ({ ...a, [studentId]: next }));
  };

  const selectedClassObj = classes.find((c) => c.id === selectedClass);

  const presentCount = classStudents.filter((s) => attendance[s.id] === "present").length;
  const absentCount = classStudents.filter((s) => attendance[s.id] === "absent").length;
  const lateCount = classStudents.filter((s) => attendance[s.id] === "late").length;
  const excusedCount = classStudents.filter((s) => attendance[s.id] === "excused").length;

  return (
    <div>
      <PageHeader title="Attendance" description="Track daily student attendance">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" />
          Save Attendance
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {(selectedClassObj?.sections || ["A"]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10"><Check className="h-5 w-5 text-success" /></div>
          <div><p className="text-lg font-bold text-foreground">{presentCount}</p><p className="text-xs text-muted-foreground">Present</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10"><XIcon className="h-5 w-5 text-destructive" /></div>
          <div><p className="text-lg font-bold text-foreground">{absentCount}</p><p className="text-xs text-muted-foreground">Absent</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10"><Clock className="h-5 w-5 text-warning" /></div>
          <div><p className="text-lg font-bold text-foreground">{lateCount}</p><p className="text-xs text-muted-foreground">Late</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><AlertCircle className="h-5 w-5 text-primary" /></div>
          <div><p className="text-lg font-bold text-foreground">{excusedCount}</p><p className="text-xs text-muted-foreground">Excused</p></div>
        </div>
      </div>

      {/* Student List */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Roll No</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student) => {
              const status = attendance[student.id] || "present";
              const config = statusConfig[status];
              const Icon = config.icon;
              return (
                <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 text-foreground">{student.rollNo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {getInitials(`${student.firstName} ${student.lastName}`)}
                      </div>
                      <span className="font-medium text-foreground">{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleStatus(student.id)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          config.color
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {config.label}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {classStudents.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No students found in this class and section.
          </div>
        )}
      </div>
    </div>
  );
}
