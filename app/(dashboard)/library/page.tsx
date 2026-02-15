"use client";

import { useState } from "react";
import { libraryBooks } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Search, Plus, BookOpen, X } from "lucide-react";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const filtered = libraryBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalBooks = libraryBooks.reduce((sum, b) => sum + b.totalCopies, 0);
  const totalAvailable = libraryBooks.reduce((sum, b) => sum + b.availableCopies, 0);

  return (
    <div>
      <PageHeader title="Library" description="Manage book catalog and circulation">
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Book
        </button>
      </PageHeader>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalBooks}</p>
            <p className="text-xs text-muted-foreground">Total Books</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <BookOpen className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalAvailable}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <BookOpen className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalBooks - totalAvailable}</p>
            <p className="text-xs text-muted-foreground">Issued</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, ISBN, or category..."
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">ISBN</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Shelf</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Available</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((book) => (
              <tr key={book.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{book.title}</td>
                <td className="px-4 py-3 text-foreground">{book.author}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{book.isbn}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{book.category}</span>
                </td>
                <td className="px-4 py-3 text-foreground">{book.shelfLocation}</td>
                <td className="px-4 py-3 text-center text-foreground">{book.availableCopies}/{book.totalCopies}</td>
                <td className="px-4 py-3 text-center">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    book.status === "available" && "bg-success/10 text-success",
                    book.status === "low-stock" && "bg-warning/10 text-warning",
                    book.status === "out-of-stock" && "bg-destructive/10 text-destructive"
                  )}>
                    {book.status === "out-of-stock" ? "Out of Stock" : book.status === "low-stock" ? "Low Stock" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    disabled={book.availableCopies === 0}
                    className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No books found.</div>
        )}
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowDialog(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add New Book</h2>
              <button onClick={() => setShowDialog(false)} className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setShowDialog(false); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Title</label>
                <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Author</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">ISBN</label>
                  <input className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Fiction</option><option>Science</option><option>Technology</option>
                    <option>Mathematics</option><option>History</option><option>Reference</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">Copies</label>
                  <input type="number" min="1" className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowDialog(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
