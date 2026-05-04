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

type Page = "dashboard" | "calendar" | "subscriptions" | "finance" | "groups" | "analytics" | "profile" | "login";
type Role = "athlete" | "coach" | "admin";

export default function Index() {
  const [page, setPage] = useState<Page>("login");
  const [role, setRole] = useState<Role>("athlete");

  if (page === "login") {
    return (
      <LoginPage
        onLogin={(r: Role) => {
          setRole(r);
          setPage("dashboard");
        }}
      />
    );
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard role={role} />;
      case "calendar": return <CalendarPage />;
      case "subscriptions": return <Subscriptions />;
      case "finance": return <Finance />;
      case "groups": return <Groups />;
      case "analytics": return <Analytics />;
      case "profile": return <Profile role={role} />;
      default: return <Dashboard role={role} />;
    }
  };

  return (
    <Layout
      currentPage={page}
      onNavigate={(p) => setPage(p as Page)}
      role={role}
    >
      {renderPage()}
    </Layout>
  );
}