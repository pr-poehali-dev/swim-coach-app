import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import CalendarPage from "@/pages/CalendarPage";
import Subscriptions from "@/pages/Subscriptions";
import Finance from "@/pages/Finance";
import Groups from "@/pages/Groups";
import Analytics from "@/pages/Analytics";
import Profile from "@/pages/Profile";
import LoginPage from "@/pages/LoginPage";
import type { UserData } from "@/types/user";

type Page = "dashboard" | "calendar" | "subscriptions" | "finance" | "groups" | "analytics" | "profile" | "login";

export default function Index() {
  const [page, setPage] = useState<Page>("login");
  const [user, setUser] = useState<UserData | null>(null);

  if (page === "login" || !user) {
    return (
      <LoginPage
        onLogin={(data: UserData) => {
          setUser(data);
          setPage("dashboard");
        }}
      />
    );
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard role={user.role} user={user} />;
      case "calendar": return <CalendarPage />;
      case "subscriptions": return <Subscriptions />;
      case "finance": return <Finance />;
      case "groups": return <Groups />;
      case "analytics": return <Analytics />;
      case "profile": return <Profile role={user.role} user={user} />;
      default: return <Dashboard role={user.role} user={user} />;
    }
  };

  return (
    <Layout
      currentPage={page}
      onNavigate={(p) => setPage(p as Page)}
      role={user.role}
    >
      {renderPage()}
    </Layout>
  );
}
