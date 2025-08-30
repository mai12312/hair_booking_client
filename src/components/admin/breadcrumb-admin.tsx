"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function BreadcrumbAdmin() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean) // e.g., ['admin', 'dashboard']

  // This component is for admin pages. We'll hide the root "admin" segment
  // from the breadcrumb because it's a namespace, not a page with a link.
  if (pathSegments.length === 0 || pathSegments[0] !== "admin") {
    return null
  }

  // Get all segments after "admin" to display in the breadcrumb
  const displaySegments = pathSegments.slice(1)

  // If the path is just "/admin", don't show any breadcrumbs.
  if (displaySegments.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {displaySegments.map((segment, index) => {
          // Reconstruct the full path for the link using the original segments.
          // e.g., for "users" segment, path is "/admin/users"
          const href = `/${pathSegments.slice(0, index + 2).join("/")}`
          const isLast = index === displaySegments.length - 1

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{capitalize(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}