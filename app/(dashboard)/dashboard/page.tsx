"use client";

import { useAuth } from "@/lib/auth-context";
import { dashboardStats } from "@/lib/mock-data";
import { StatCard } from "@/components/stat-card";
import {
  Users,
  GraduationCap,
  School,
  DollarSign,
  FileText,
  CreditCard,
  UserPlus,
  ClipboardList,
  Megaphone,
  CalendarDays,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityIcons: Record<string, typeof FileText> = {
  assignment: FileText,
  payment: CreditCard,
  enrollment: UserPlus,
  grade: ClipboardList,
  announcement: Megaphone,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = dashboardStats;

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Welcome back, {user?.firstName || "Admin"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Here's what's happening at your school today."}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: 12, label: "from last month" }}
          description="from last month"
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={GraduationCap}
          trend={{ value: 3, label: "new this term" }}
          description="new this term"
          iconClassName="bg-success/10 text-success"
        />
        <StatCard
          title="Active Classes"
          value={stats.totalClasses}
          icon={School}
          description="across all grades"
          iconClassName="bg-warning/10 text-warning"
        />
        <StatCard
          title="Fee Collection"
          value={`${stats.feeCollectionRate}%`}
          icon={DollarSign}
          trend={{ value: 5, label: "from last month" }}
          description="from last month"
          iconClassName="bg-primary/10 text-primary"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Attendance Chart */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">
            Weekly Attendance Overview
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }}
                  axisLine={{ stroke: "hsl(214 32% 91%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }}
                  axisLine={{ stroke: "hsl(214 32% 91%)" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(214 32% 91%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="present"
                  fill="hsl(217 91% 50%)"
                  radius={[4, 4, 0, 0]}
                  name="Present %"
                />
                <Bar
                  dataKey="absent"
                  fill="hsl(0 84% 60%)"
                  radius={[4, 4, 0, 0]}
                  name="Absent %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Attendance Summary */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">
            {"Today's Attendance"}
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(214 32% 91%)"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(217 91% 50%)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${stats.todayAttendance * 2.51} 251`}
                />
              </svg>
              <span className="absolute text-2xl font-bold text-card-foreground">
                {stats.todayAttendance}%
              </span>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-primary/5 p-3">
                <p className="text-lg font-bold text-primary">1,160</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="rounded-lg bg-destructive/5 p-3">
                <p className="text-lg font-bold text-destructive">74</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity + Upcoming Events */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">
            Recent Activity
          </h2>
          <ul className="flex flex-col gap-4">
            {stats.recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type] || FileText;
              return (
                <li key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground leading-relaxed">
                      {activity.text}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">
            Upcoming Events
          </h2>
          <ul className="flex flex-col gap-4">
            {stats.upcomingEvents.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {event.date}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {event.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
