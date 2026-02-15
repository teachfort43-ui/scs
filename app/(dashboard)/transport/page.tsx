"use client";

import { transportRoutes } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { Plus, Bus, Users, MapPin, Clock, Phone } from "lucide-react";

export default function TransportPage() {
  const totalStudents = transportRoutes.reduce((sum, r) => sum + r.currentStudents, 0);
  const totalCapacity = transportRoutes.reduce((sum, r) => sum + r.capacity, 0);

  return (
    <div>
      <PageHeader title="Transport" description="Manage school transport routes and assignments">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Route
        </button>
      </PageHeader>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{transportRoutes.length}</p>
            <p className="text-xs text-muted-foreground">Active Routes</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <Users className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
            <p className="text-xs text-muted-foreground">Students Enrolled</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <Bus className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{Math.round((totalStudents / totalCapacity) * 100)}%</p>
            <p className="text-xs text-muted-foreground">Capacity Utilization</p>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {transportRoutes.map((route) => (
          <div key={route.id} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{route.routeName}</h3>
                  <p className="text-xs text-muted-foreground">{route.routeNumber} - {route.vehicleNumber}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {route.currentStudents}/{route.capacity}
              </span>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" />
                <span>Driver: {route.driver}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{route.driverPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bus className="h-4 w-4 shrink-0" />
                <span>{route.vehicleType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Departs {route.departureTime} - Arrives {route.arrivalTime}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Stops ({route.stops.length})</p>
              <div className="flex flex-wrap gap-2">
                {route.stops.map((stop, i) => (
                  <span key={stop} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {stop}
                  </span>
                ))}
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Capacity</span>
                <span>{Math.round((route.currentStudents / route.capacity) * 100)}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(route.currentStudents / route.capacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
