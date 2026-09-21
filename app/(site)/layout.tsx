import { BottomTabBar } from "@/components/bottom-tab-bar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-surface text-on-surface min-h-screen pb-24">
      {children}
      <BottomTabBar />
    </main>
  );
}