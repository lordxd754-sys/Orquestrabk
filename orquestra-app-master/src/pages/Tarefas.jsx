 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Tarefas.jsx b/src/pages/Tarefas.jsx
index d0166c4fa6bc26126d6d9efb201a9e22255e7648..e79ac02dd3495ee0cd9f6cb05cc5383fd32ecef2 100644
--- a/src/pages/Tarefas.jsx
+++ b/src/pages/Tarefas.jsx
@@ -1,72 +1,51 @@
-import React, { useState } from "react";
-import { base44 } from "@/api/base44Client";
-import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
+import React from "react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
-import { Plus, Search, Filter, CheckCircle2, Circle, Clock, AlertCircle, Trash2, Edit2, MoreVertical } from "lucide-react";
-import { motion, AnimatePresence } from "framer-motion";
-
-const prioridadeConfig = {
-  baixa: {
-    bg: "bg-green-500/10",
-    text: "text-green-300",
-    border: "border-green-500/30",
-    label: "Baixa",
-    icon: "🟢"
-  },
-  media: {
-    bg: "bg-yellow-500/10",
-    text: "text-yellow-300",
-    border: "border-yellow-500/30",
-    label: "Média",
-    icon: "🟡"
-  },
-  alta: {
-    bg: "bg-red-500/10",
-    text: "text-red-300",
-    border: "border-red-500/30",
-    label: "Alta",
-    icon: "🔴"
-  }
-};
-
-const statusConfig = {
-  pendente: {
-    icon: Circle,
-    label: "Pendente",
-    color: "text-gray-400"
-  },
-  em_progresso: {
-    icon: Clock,
-    label: "Em Progresso",
-    color: "text-blue-400"
-  },
-  concluida: {
-    icon: CheckCircle2,
-    label: "Concluída",
-    color: "text-green-400"
-  }
-};
 
 export default function Tarefas() {
-  const [dialogOpen, setDialogOpen] = useState(false);
-  const [editingTask, setEditingTask] = useState(null);
-  const [filter, setFilter] = useState('todas');
-  const [isLoadingUser, setIsLoadingUser] = useState(true);
-  const queryClient = useQueryClient();
+  const [tarefas, setTarefas] = React.useState([
+    { id: 1, title: "Revisar metas da semana", done: false },
+    { id: 2, title: "Planejar conteúdo", done: true },
+  ]);
 
-  React.useEffect(() => {
-    const loadUser = async () => {
-      try {
-        await base44.auth.me();
-      } catch (error) {
-        console.error("Erro ao carregar usuário:", error);
-      } finally {
-        setIsLoadingUser(false);
-      }
-    };
-    loadUser();
-  }, []);
+  const toggleDone = (id) => {
+    setTarefas((prev) =>
+      prev.map((tarefa) =>
+        tarefa.id === id ? { ...tarefa, done: !tarefa.done } : tarefa
+      )
+    );
+  };
 
-  // ... lógica de tarefas
+  return (
+    <div className="space-y-4">
+      <Card>
+        <CardContent className="flex items-center justify-between">
+          <div>
+            <h2 className="text-lg font-semibold">Tarefas</h2>
+            <p className="text-sm text-slate-600">
+              Priorize o que precisa ser entregue hoje.
+            </p>
+          </div>
+          <Button variant="outline">Adicionar</Button>
+        </CardContent>
+      </Card>
+      <Card>
+        <CardContent className="space-y-2">
+          {tarefas.map((tarefa) => (
+            <button
+              key={tarefa.id}
+              className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
+                tarefa.done
+                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
+                  : "border-slate-200"
+              }`}
+              onClick={() => toggleDone(tarefa.id)}
+            >
+              {tarefa.title}
+            </button>
+          ))}
+        </CardContent>
+      </Card>
+    </div>
+  );
 }
 
EOF
)
