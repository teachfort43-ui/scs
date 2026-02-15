"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import {
  Settings,
  School,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Check,
} from "lucide-react"

const tabs = [
  { id: "general", label: "General", icon: School },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage school configuration and preferences"
        icon={Settings}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Tabs sidebar */}
        <nav className="flex gap-1 lg:w-56 lg:shrink-0 lg:flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 rounded-lg border bg-card p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  School Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Basic details about your school
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    School Name
                  </label>
                  <input
                    type="text"
                    defaultValue="SchoolPro Academy"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    School Code
                  </label>
                  <input
                    type="text"
                    defaultValue="SPA-2025"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@schoolpro.edu"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Education Lane, Knowledge City, KC 12345"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Academic Year
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure the current academic session
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Current Session
                  </label>
                  <input
                    type="text"
                    defaultValue="2025-2026"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Current Term
                  </label>
                  <select
                    defaultValue="Term 2"
                    className="h-9 w-full appearance-none rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  >
                    <option>Term 1</option>
                    <option>Term 2</option>
                    <option>Term 3</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Notification Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose what notifications you receive
                </p>
              </div>
              {[
                { label: "Email Notifications", desc: "Receive updates via email", defaultChecked: true },
                { label: "SMS Alerts", desc: "Get critical alerts via SMS", defaultChecked: false },
                { label: "Attendance Alerts", desc: "Notify parents of absences", defaultChecked: true },
                { label: "Fee Reminders", desc: "Send payment due reminders", defaultChecked: true },
                { label: "Exam Results", desc: "Notify when results are published", defaultChecked: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-9 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Security Settings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage access and security policies
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    defaultValue={8}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  />
                </div>
              </div>
              {[
                { label: "Two-Factor Authentication", desc: "Require 2FA for admin accounts", defaultChecked: false },
                { label: "Force Password Change", desc: "Require password change every 90 days", defaultChecked: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-9 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Appearance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize the look and feel of the application
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Language
                </label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <select
                    defaultValue="en"
                    className="h-9 w-full max-w-xs appearance-none rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Date Format
                </label>
                <select
                  defaultValue="MM/DD/YYYY"
                  className="h-9 w-full max-w-xs appearance-none rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-end gap-3 border-t pt-4">
            <button
              onClick={handleSave}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
