import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/footer"
import { GuestBanner } from "@/components/auth/guest-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <GuestBanner />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
