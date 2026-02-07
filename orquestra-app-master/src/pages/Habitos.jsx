 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Habitos.jsx b/src/pages/Habitos.jsx
index b6b8b57634e1e89ca120b4c3abc6c0d8bc422442..1f3f1fbcd9fcb1451be50b26af09249b96a29824 100644
--- a/src/pages/Habitos.jsx
+++ b/src/pages/Habitos.jsx
@@ -1,59 +1,39 @@
 import React from "react";
-import { base44 } from "@/api/base44Client";
-import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
-import { Plus, Check, X, Edit2, Trash2, Calendar, TrendingUp, Award, Clock } from "lucide-react";
-import { motion, AnimatePresence } from "framer-motion";
-import { format, startOfDay, isToday, parseISO } from "date-fns";
-import { ptBR } from "date-fns/locale";
 
 export default function Habitos() {
-  const [user, setUser] = React.useState(null);
-  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
-  const [dialogOpen, setDialogOpen] = React.useState(false);
-  const [editingHabit, setEditingHabit] = React.useState(null);
-  const queryClient = useQueryClient();
-
-  const { data: habitos = [] } = useQuery({
-    queryKey: ['habitos'],
-    queryFn: () => base44.entities.Habito.list('-created_date'),
-    initialData: [],
-    enabled: !isLoadingUser,
-  });
-
-  if (isLoadingUser) {
-    return (
-      <div className="min-h-screen flex items-center justify-center">
-        <div className="text-white text-lg">Carregando...</div>
-      </div>
-    );
-  }
+  const [habitos] = React.useState([
+    "Meditar 10 minutos",
+    "Beber 2L de água",
+    "Ler 20 páginas",
+  ]);
 
   return (
-    <div className="min-h-screen p-4 md:p-8">
-      <div className="max-w-6xl mx-auto">
-        <motion.div
-          initial={{ opacity: 0, y: -20 }}
-          animate={{ opacity: 1, y: 0 }}
-          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
-        >
+    <div className="space-y-4">
+      <Card>
+        <CardContent className="flex items-center justify-between">
           <div>
-            <h1 className="text-4xl font-bold text-white mb-2">Hábitos</h1>
-            <p className="text-purple-200">Construa rotinas saudáveis e acompanhe seu progresso</p>
+            <h2 className="text-lg font-semibold">Hábitos</h2>
+            <p className="text-sm text-slate-600">
+              Acompanhe sua rotina diária com foco e consistência.
+            </p>
           </div>
-          <Button
-            onClick={() => {
-              setEditingHabit(null);
-              setDialogOpen(true);
-            }}
-            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
-          >
-            <Plus className="w-5 h-5 mr-2" />
-            Novo Hábito
-          </Button>
-        </motion.div>
-      </div>
+          <Button variant="outline">Novo hábito</Button>
+        </CardContent>
+      </Card>
+      <Card>
+        <CardContent className="space-y-2">
+          {habitos.map((habito) => (
+            <div
+              key={habito}
+              className="rounded-md border border-slate-200 px-3 py-2 text-sm"
+            >
+              {habito}
+            </div>
+          ))}
+        </CardContent>
+      </Card>
     </div>
   );
 }
 
EOF
)
