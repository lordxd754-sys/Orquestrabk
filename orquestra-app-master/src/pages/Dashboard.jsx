 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Dashboard.jsx b/src/pages/Dashboard.jsx
index 1728e68400fe38fa62cdadaa446dd5f1dcc55ff9..0831618efa6a49b06ad9144fb866ba99ff52120a 100644
--- a/src/pages/Dashboard.jsx
+++ b/src/pages/Dashboard.jsx
@@ -1,50 +1,32 @@
 import React from "react";
-import { base44 } from "@/api/base44Client";
-import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { Card, CardContent } from "@/components/ui/card";
-import { Button } from "@/components/ui/button";
-import { CheckSquare, DollarSign, Target, Bell, TrendingUp, ArrowUp, ArrowDown, Calendar, Sparkles, MessageSquare, Settings, GripVertical } from "lucide-react";
-import { format, startOfDay, isToday, isFuture, parseISO } from "date-fns";
-import { ptBR } from "date-fns/locale";
-import { motion, AnimatePresence } from "framer-motion";
-import { Link } from "react-router-dom";
-import { createPageUrl } from "@/utils";
 import { Badge } from "@/components/ui/badge";
 import { Progress } from "@/components/ui/progress";
-import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
-import AIAssistant from "../components/dashboard/AIAssistant";
-import ContentPerformanceWidget from "../components/dashboard/ContentPerformanceWidget";
-import WidgetSelector from "../components/dashboard/WidgetSelector";
 
 export default function Dashboard() {
-  const [user, setUser] = React.useState(null);
-  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
-  const [isSaldoVisible, setIsSaldoVisible] = React.useState(() => {
-    const saved = localStorage.getItem('saldoVisible');
-    return saved === null ? true : JSON.parse(saved);
-  });
-  const [greeting, setGreeting] = React.useState('');
-  const [widgetSelectorOpen, setWidgetSelectorOpen] = React.useState(false);
-  const queryClient = useQueryClient();
+  const [progress] = React.useState(72);
 
-  React.useEffect(() => {
-    const loadUser = async () => {
-      try {
-        const userData = await base44.auth.me();
-        setUser(userData);
-      } catch (error) {
-        console.error("Erro ao carregar usuário:", error);
-      } finally {
-        setIsLoadingUser(false);
-      }
-    };
-    loadUser();
+  return (
+    <div className="grid gap-4">
+      <Card>
+        <CardContent className="space-y-2">
+          <Badge>Visão geral</Badge>
+          <h2 className="text-xl font-semibold">Bem-vindo ao Orquestra</h2>
+          <p className="text-sm text-slate-600">
+            Centralize tarefas, agenda e finanças em um único painel.
+          </p>
+        </CardContent>
+      </Card>
 
-    const hour = new Date().getHours();
-    if (hour < 12) setGreeting('Bom dia');
-    else if (hour < 18) setGreeting('Boa tarde');
-    else setGreeting('Boa noite');
-  }, []);
-
-  // ... resto do componente
+      <Card>
+        <CardContent className="space-y-3">
+          <h3 className="text-sm font-semibold text-slate-700">
+            Progresso semanal
+          </h3>
+          <Progress value={progress} />
+          <p className="text-xs text-slate-500">{progress}% concluído</p>
+        </CardContent>
+      </Card>
+    </div>
+  );
 }
 
EOF
)
