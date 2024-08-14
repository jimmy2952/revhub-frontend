"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <section className="container flex py-8">
      <nav className="flex w-44 flex-col gap-y-4 text-muted-foreground">
        <Link href="/admin/resources" className={pathname === "/admin/resources" ? "font-semibold text-primary" : ""}>
          Resources
        </Link>
        <Link href="/admin/resource_types" className={pathname === "/admin/resource_types" ? "font-semibold text-primary" : ""}>Resource Types</Link>
        {/* <Link href="#">Integrations</Link>
        <Link href="#">Support</Link>
        <Link href="#">Organizations</Link>
        <Link href="#">Advanced</Link> */}
      </nav>
      {children}
    </section>
  )
}
