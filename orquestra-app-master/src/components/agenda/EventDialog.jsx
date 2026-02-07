 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/components/agenda/EventDialog.jsx b/src/components/agenda/EventDialog.jsx
index 192786693e632ac029bc5768eb39e42f78c5556a..e107ec6d9f38768e7c43f179a78571508e88f833 100644
--- a/src/components/agenda/EventDialog.jsx
+++ b/src/components/agenda/EventDialog.jsx
@@ -1,54 +1,20 @@
-import React, { useState, useEffect } from "react";
-import { useQueryClient, useMutation } from "@tanstack/react-query";
-import { base44 } from "@/api/base44Client";
-import {
-  Dialog,
-  DialogContent,
-  DialogHeader,
-  DialogTitle,
-} from "@/components/ui/dialog";
-import { Button } from "@/components/ui/button";
-import { Input } from "@/components/ui/input";
-import { Textarea } from "@/components/ui/textarea";
-import { Label } from "@/components/ui/label";
-import {
-  Select,
-  SelectContent,
-  SelectItem,
-  SelectTrigger,
-  SelectValue,
-} from "@/components/ui/select";
-import { Checkbox } from "@/components/ui/checkbox";
-import { format } from "date-fns";
+import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 
-const coresDisponiveis = [
-  "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B",
-  "#10B981", "#3B82F6", "#EF4444", "#06B6D4"
-];
+export default function EventDialog({ open }) {
+  if (!open) {
+    return null;
+  }
 
-const diasSemana = [
-  { label: 'Dom', value: 0 },
-  { label: 'Seg', value: 1 },
-  { label: 'Ter', value: 2 },
-  { label: 'Qua', value: 3 },
-  { label: 'Qui', value: 4 },
-  { label: 'Sex', value: 5 },
-  { label: 'Sáb', value: 6 },
-];
-
-export default function EventDialog({ open, onOpenChange, event, selectedDate }) {
-  const queryClient = useQueryClient();
-  const [formData, setFormData] = useState({
-    titulo: "",
-    descricao: "",
-    data_inicio: "",
-    data_fim: "",
-    local: "",
-    cor: "#6366F1",
-    recorrencia: "nenhuma",
-    dias_semana: [],
-    recorrencia_ate: ""
-  });
-
-  // ... lógica do formulário de eventos
+  return (
+    <Dialog>
+      <DialogContent>
+        <DialogHeader>
+          <DialogTitle>Evento em construção</DialogTitle>
+        </DialogHeader>
+        <p className="text-sm text-slate-600">
+          O formulário completo será adicionado na próxima etapa.
+        </p>
+      </DialogContent>
+    </Dialog>
+  );
 }
 
EOF
)
