"use client";

import { use, useState } from "react";
import Link from "next/link";
import { students, gradeRecords, attendanceRecords } from "@/lib/mock-data";
import { getInitials, formatDate, cn } from "@/lib/utils";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  Users as UsersIcon,
  FileText,
} from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "academic", label: "Academic", icon: BookOpen },
  { id: "family", label: "Family", icon: UsersIcon },
  { id: "documents", label: "Documents", icon: FileText },
];

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const student = students.find((s) => s.id === id);
  const [activeTab, setActiveTab] = useState("personal");

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Student not found</p>
        <Link href="/students" className="mt-2 text-sm text-primary hover:underline">
          Back to students
        </Link>
      </div>
    );
  }

  const studentGrades = gradeRecords.filter((g) => g.studentId === id);
  const studentAttendance = attendanceRecords.filter((a) => a.studentId === id);
  const presentCount = studentAttendance.filter((a) => a.status === "present").length;
  const attendanceRate = studentAttendance.length > 0 ? Math.round((presentCount / studentAttendance.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link */}
      <Link
        href="/students"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Students
      </Link>

      {/* Profile Card */}
      <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
          {getInitials(`${student.firstName} ${student.lastName}`)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">
              {student.firstName} {student.lastName}
            </h1>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                student.status === "active" && "bg-success/10 text-success",
                student.status === "inactive" && "bg-destructive/10 text-destructive",
                student.status === "transferred" && "bg-warning/10 text-warning"
              )}
            >
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{student.studentId}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {student.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {student.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {student.address}</span>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div className="rounded-lg bg-primary/5 px-4 py-2">
            <p className="text-lg font-bold text-primary">{student.className}</p>
            <p className="text-xs text-muted-foreground">Class</p>
          </div>
          <div className="rounded-lg bg-success/5 px-4 py-2">
            <p className="text-lg font-bold text-success">{attendanceRate}%</p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-1" aria-label="Student detail tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        {activeTab === "personal" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoRow label="Full Name" value={`${student.firstName} ${student.lastName}`} />
            <InfoRow label="Date of Birth" value={formatDate(student.dateOfBirth)} />
            <InfoRow label="Gender" value={student.gender} />
            <InfoRow label="Blood Group" value={student.bloodGroup} />
            <InfoRow label="Email" value={student.email} />
            <InfoRow label="Phone" value={student.phone} />
            <InfoRow label="Address" value={student.address} />
            <InfoRow label="Admission Date" value={formatDate(student.admissionDate)} />
          </div>
        )}

        {activeTab === "academic" && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{student.className} - {student.section}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Roll Number</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{student.rollNo}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="mt-1 text-lg font-semibold text-success">{attendanceRate}%</p>
              </div>
            </div>
            {studentGrades.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-foreground">Grade Records</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Subject</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Classwork</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Homework</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Midterm</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Final</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Total</th>
                        <th className="px-3 py-2 text-center font-medium text-muted-foreground">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentGrades.map((g) => (
                        <tr key={g.id} className="border-b border-border last:border-0">
                          <td className="px-3 py-2 text-foreground">{g.subject}</td>
                          <td className="px-3 py-2 text-center text-foreground">{g.classwork}</td>
                          <td className="px-3 py-2 text-center text-foreground">{g.homework}</td>
                          <td className="px-3 py-2 text-center text-foreground">{g.midterm}</td>
                          <td className="px-3 py-2 text-center text-foreground">{g.final}</td>
                          <td className="px-3 py-2 text-center font-semibold text-foreground">{g.total}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              g.grade.startsWith("A") ? "bg-success/10 text-success" :
                              g.grade.startsWith("B") ? "bg-primary/10 text-primary" :
                              g.grade === "C" ? "bg-warning/10 text-warning" :
                              "bg-destructive/10 text-destructive"
                            )}>
                              {g.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "family" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoRow label="Parent/Guardian Name" value={student.parentName} />
            <InfoRow label="Parent Phone" value={student.parentPhone} />
            <InfoRow label="Parent Email" value={student.parentEmail} />
            <InfoRow label="Relationship" value="Father" />
          </div>
        )}

        {activeTab === "documents" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No documents uploaded</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Student documents like birth certificate, transfer certificate, etc. will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
