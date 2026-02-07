 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/Layout.jsx b/src/Layout.jsx
index 8b0546d15c582614023d17f4facb0b8c78336c63..1c658b7e8c3131f15f7e685ec3672886283cc5c0 100644
--- a/src/Layout.jsx
+++ b/src/Layout.jsx
@@ -1,49 +1,63 @@
 import React from "react";
 import { Link, useLocation } from "react-router-dom";
 import { createPageUrl } from "@/utils";
-import {
-  LayoutDashboard,
-  MessageSquare,
-  CheckSquare,
-  DollarSign,
-  Target,
-  Bell,
-  Sparkles,
-  LogOut,
-  Menu,
-  X } from
-"lucide-react";
-import {
-  Sidebar,
-  SidebarContent,
-  SidebarGroup,
-  SidebarGroupContent,
-  SidebarMenu,
-  SidebarMenuButton,
-  SidebarMenuItem,
-  SidebarHeader,
-  SidebarFooter,
-  SidebarProvider,
-  SidebarTrigger } from
-"@/components/ui/sidebar";
-import { base44 } from "@/api/base44Client";
-import { motion, AnimatePresence } from "framer-motion";
 
 const navigationItems = [
-  {
-    title: "Dashboard",
-    url: createPageUrl("Dashboard"),
-    icon: LayoutDashboard,
-  },
-  {
-    title: "Conversar com IA",
-    url: createPageUrl("Chat"),
-    icon: MessageSquare,
-  },
-  {
-    title: "Tarefas",
-    url: createPageUrl("Tarefas"),
-    icon: CheckSquare,
-  },
-  // ... resto do arquivo seria capturado aqui
+  { title: "Dashboard", url: createPageUrl("Dashboard") },
+  { title: "Conversar com IA", url: createPageUrl("Chat") },
+  { title: "Tarefas", url: createPageUrl("Tarefas") },
+  { title: "Finanças", url: createPageUrl("Financas") },
+  { title: "Hábitos", url: createPageUrl("Habitos") },
+  { title: "Agenda", url: createPageUrl("Agenda") },
+  { title: "Central de Conteúdo", url: createPageUrl("CentralConteudo") },
 ];
+
+export default function Layout({ children }) {
+  const location = useLocation();
+
+  return (
+    <div className="min-h-screen bg-slate-50">
+      <header className="border-b border-slate-200 bg-white">
+        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
+          <div>
+            <p className="text-xs uppercase tracking-wide text-slate-500">Orquestra</p>
+            <h1 className="text-lg font-semibold text-slate-900">Painel de comando</h1>
+          </div>
+          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
+            Ambiente local
+          </span>
+        </div>
+      </header>
+
+      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-6">
+        <aside className="w-64 shrink-0">
+          <nav className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
+            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
+              Navegação
+            </p>
+            <div className="space-y-1">
+              {navigationItems.map((item) => {
+                const isActive = location.pathname === item.url;
+                return (
+                  <Link
+                    key={item.title}
+                    to={item.url}
+                    className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
+                      isActive
+                        ? "bg-slate-900 text-white"
+                        : "text-slate-700 hover:bg-slate-100"
+                    }`}
+                  >
+                    {item.title}
+                  </Link>
+                );
+              })}
+            </div>
+          </nav>
+        </aside>
+
+        <main className="flex-1">{children}</main>
+      </div>
+    </div>
+  );
+}
 
EOF
)
