 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Financas.jsx b/src/pages/Financas.jsx
index d0d309328ec29ab0cb4577c15f695b8bdb0c5c54..6d574103f9936a3c9bb5ae086a9271a0fec43b59 100644
--- a/src/pages/Financas.jsx
+++ b/src/pages/Financas.jsx
@@ -1,73 +1,30 @@
 import React from "react";
-import { base44 } from "@/api/base44Client";
-import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
-import { DollarSign, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Plus, Filter, Download } from "lucide-react";
-import { motion, AnimatePresence } from "framer-motion";
-import FinancialChart from "../components/financas/FinancialChart";
 
 export default function Financas() {
-  const [user, setUser] = React.useState(null);
-  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
-  const [isSaldoVisible, setIsSaldoVisible] = React.useState(() => {
-    const saved = localStorage.getItem('saldoVisible');
-    return saved === null ? true : JSON.parse(saved);
-  });
-  const queryClient = useQueryClient();
-
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
-  }, []);
-
-  React.useEffect(() => {
-    const handleVisibilityChange = () => {
-      const saved = localStorage.getItem('saldoVisible');
-      if (saved !== null) {
-        setIsSaldoVisible(JSON.parse(saved));
-      }
-    };
-    window.addEventListener('saldoVisibilityChange', handleVisibilityChange);
-    return () => window.removeEventListener('saldoVisibilityChange', handleVisibilityChange);
-  }, []);
-
-  const handleToggleSaldo = () => {
-    const newValue = !isSaldoVisible;
-    setIsSaldoVisible(newValue);
-    localStorage.setItem('saldoVisible', JSON.stringify(newValue));
-    window.dispatchEvent(new CustomEvent('saldoVisibilityChange'));
-  };
-
-  const { data: transacoes = [] } = useQuery({
-    queryKey: ['transacoes'],
-    queryFn: () => base44.entities.Transacao.list('-data'),
-    initialData: [],
-    enabled: !isLoadingUser,
-  });
-
-  const totalReceitas = transacoes
-    .filter(t => t.tipo === "receita")
-    .reduce((acc, t) => acc + t.valor, 0);
-
-  const totalDespesas = transacoes
-    .filter(t => t.tipo === "despesa")
-    .reduce((acc, t) => acc + t.valor, 0);
-
-  const saldo = totalReceitas - totalDespesas;
+  const [saldo] = React.useState(4520);
 
   return (
-    <div className="min-h-screen p-4 md:p-8">
-      {/* Interface de Finanças */}
+    <div className="space-y-4">
+      <Card>
+        <CardContent className="flex items-center justify-between">
+          <div>
+            <h2 className="text-lg font-semibold">Finanças</h2>
+            <p className="text-sm text-slate-600">
+              Saldo atual estimado: R$ {saldo.toLocaleString("pt-BR")}
+            </p>
+          </div>
+          <Button variant="outline">Registrar transação</Button>
+        </CardContent>
+      </Card>
+      <Card>
+        <CardContent>
+          <p className="text-sm text-slate-600">
+            Conecte suas contas para visualizar entradas e saídas automaticamente.
+          </p>
+        </CardContent>
+      </Card>
     </div>
   );
 }
 
EOF
)
