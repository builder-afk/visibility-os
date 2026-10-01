"use client"

import { MonitorSmartphone, User, LogOut, Sparkles } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/store/projectStore"
import { useAuth } from "@/hooks/use-auth"
import { usePathname, useRouter } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import Link from "next/link"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const selectedTool = useAppStore((state) => state.selectedTool)
  const setSelectedTool = useAppStore((state) => state.setSelectedTool)
  const { user, isGuest, isAuthenticated, logout } = useAuth()

  if (pathname.startsWith('/marketplace')) {
    return <PublicNavbar className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Breadcrumbs or active section indicator */}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-3">
          <nav className="flex items-center space-x-2">
            {/* Tool Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "h-8" })}>
                <MonitorSmartphone className="mr-2 h-4 w-4" />
                {selectedTool}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedTool("Cursor")}>
                  Cursor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTool("Windsurf")}>
                  Windsurf
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTool("Antigravity")}>
                  Antigravity
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth status & User controls */}
            {isGuest ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Guest
                </span>
                <Link href="/login?mode=upgrade">
                  <Button size="sm" className="h-8 gap-1.5 bg-[#ff5500] hover:bg-[#e04b00] text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                    Sign In
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground hover:text-foreground"
                  onClick={() => logout()}
                  title="Exit Guest Mode"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 gap-2" })}>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary" />
                  )}
                  <span className="max-w-[120px] truncate text-xs font-medium">
                    {user.name || user.email}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/team-workspace')}>
                    Team Workspace
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-8">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="h-8">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
