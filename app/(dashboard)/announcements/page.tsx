"use client"

import { useState } from "react"
import { mockAnnouncements } from "@/lib/mock-data"
import { PageHeader } from "@/components/page-header"
import {
  Megaphone,
  Plus,
  Pin,
  Calendar,
  User,
  AlertTriangle,
  Info,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react"

const priorityConfig = {
  urgent: { label: "Urgent", icon: AlertTriangle, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  high: { label: "High", icon: AlertTriangle, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  normal: { label: "Normal", icon: Info, className: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" },
  low: { label: "Low", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
}

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")

  const filtered = mockAnnouncements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = filterPriority === "all" || a.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="School-wide announcements and notices"
        icon={Megaphone}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="h-9 appearance-none rounded-md border border-input bg-background pl-9 pr-8 text-sm outline-none ring-ring focus:ring-2"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((announcement) => {
          const pConfig = priorityConfig[announcement.priority as keyof typeof priorityConfig]
          const PriorityIcon = pConfig.icon
          return (
            <div
              key={announcement.id}
              className="rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {announcement.pinned && (
                      <Pin className="h-4 w-4 text-primary" />
                    )}
                    <h3 className="font-semibold text-card-foreground">
                      {announcement.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {announcement.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-muted-foreground/60">
                      {announcement.audience}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${pConfig.className}`}
                >
                  <PriorityIcon className="h-3 w-3" />
                  {pConfig.label}
                </span>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-12">
            <Megaphone className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              No announcements found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
