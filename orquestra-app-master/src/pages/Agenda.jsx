 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Agenda.jsx b/src/pages/Agenda.jsx
index baabb60dfefa26070a714f1f94afda301307171d..4e289b8de23839e5412779f0ecb351885e7dd696 100644
--- a/src/pages/Agenda.jsx
+++ b/src/pages/Agenda.jsx
@@ -1,41 +1,29 @@
-import React, { useState } from "react";
-import { useQuery } from "@tanstack/react-query";
-import { base44 } from "@/api/base44Client";
-import { Card } from "@/components/ui/card";
+import React from "react";
+import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
-import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
-import { motion } from "framer-motion";
-import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO, addDays, addWeeks } from "date-fns";
-import { ptBR } from "date-fns/locale";
 import EventDialog from "../components/agenda/EventDialog";
 import EventList from "../components/agenda/EventList";
 
 export default function Agenda() {
-  const [currentMonth, setCurrentMonth] = useState(new Date());
-  const [selectedDate, setSelectedDate] = useState(new Date());
-  const [dialogOpen, setDialogOpen] = useState(false);
-  const [editingEvent, setEditingEvent] = useState(null);
-  const [isLoadingUser, setIsLoadingUser] = useState(true);
+  const [dialogOpen, setDialogOpen] = React.useState(false);
+  const [selectedDate] = React.useState(new Date());
 
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
+  return (
+    <div className="space-y-4">
+      <Card>
+        <CardContent className="flex items-center justify-between">
+          <div>
+            <h2 className="text-lg font-semibold">Agenda</h2>
+            <p className="text-sm text-slate-600">
+              Organize seus compromissos e acompanhe a agenda do dia.
+            </p>
+          </div>
+          <Button onClick={() => setDialogOpen(true)}>Novo evento</Button>
+        </CardContent>
+      </Card>
 
-  const { data: eventos = [] } = useQuery({
-    queryKey: ['eventos'],
-    queryFn: () => base44.entities.Evento.list('-data_inicio'),
-    initialData: [],
-    enabled: !isLoadingUser,
-  });
-
-  // ... lógica de expansão de eventos recorrentes e renderização do calendário
+      <EventList selectedDate={selectedDate} events={[]} onEdit={() => {}} />
+      <EventDialog open={dialogOpen} onOpenChange={setDialogOpen} />
+    </div>
+  );
 }
 
EOF
)
