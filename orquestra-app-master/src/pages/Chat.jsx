 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Chat.jsx b/src/pages/Chat.jsx
index 6819fcb49301c5155e0abe10aba370a299941b57..6ddfb1969ad223e38d8109a02681b7788636fa01 100644
--- a/src/pages/Chat.jsx
+++ b/src/pages/Chat.jsx
@@ -1,84 +1,50 @@
 import React from "react";
-import { base44 } from "@/api/base44Client";
-import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
-import { MessageSquare, Send, Bot, User, Sparkles, Loader2, Trash2 } from "lucide-react";
-import { motion, AnimatePresence } from "framer-motion";
 
 export default function Chat() {
-  const [user, setUser] = React.useState(null);
-  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
-  const [input, setInput] = React.useState('');
-  const [conversas, setConversas] = React.useState([]);
-  const [isProcessing, setIsProcessing] = React.useState(false);
-  const messagesEndRef = React.useRef(null);
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
-  const { data: historicoConversas = [] } = useQuery({
-    queryKey: ['conversas'],
-    queryFn: () => base44.entities.Conversa.list('-created_date', 50),
-    initialData: [],
-    enabled: !isLoadingUser,
-  });
-
-  React.useEffect(() => {
-    setConversas([...historicoConversas].reverse());
-  }, [historicoConversas]);
-
-  React.useEffect(() => {
-    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
-  }, [conversas, isProcessing]);
-
-  const processarMensagem = async (mensagemUsuario, requiresConfirmation = true) => {
-    setIsProcessing(true);
-    try {
-      const prompt = `Você é o ORQUESTRA, assistente de inteligência artificial avançado inspirado no J.A.R.V.I.S (Homem de Ferro).
-      
-CARACTERÍSTICAS OBRIGATÓRIAS:
-- Calmo, analítico e sempre no controle
-- Linguagem educada, elegante e precisa
-- Tom tecnológico e premium
-- Nunca demonstra incerteza, mantém confiança absoluta
-- Transmite tranquilidade mesmo em situações complexas
-
-Analise a mensagem e identifique ações:
-1. TAREFAS: algo que precisa fazer, criar, entregar
-2. TRANSAÇÕES: valores monetários (recebi R$, gastei, paguei)
-3. HÁBITOS: rotinas diárias (meditar, exercitar, ler)
-4. LEMBRETES: compromissos com data/hora
-5. EVENTOS: agendamentos, reuniões, compromissos na agenda
-6. BUSCA: quando pedir para buscar, pesquisar ou encontrar
-
-Mensagem: "${mensagemUsuario}"
-
-IMPORTANTE: Para ações críticas (agendamentos, transações altas, cancelamentos), sempre solicite confirmação de forma elegante.`;
-
-      // ... lógica de envio para IA e salvamento da conversa
-    } catch (error) {
-      console.error("Erro ao processar mensagem:", error);
-    } finally {
-      setIsProcessing(false);
-    }
+  const [input, setInput] = React.useState("");
+  const [messages, setMessages] = React.useState([
+    { id: 1, role: "assistant", text: "Olá! Como posso ajudar?" },
+  ]);
+
+  const handleSend = () => {
+    if (!input.trim()) return;
+    setMessages((prev) => [
+      ...prev,
+      { id: Date.now(), role: "user", text: input },
+    ]);
+    setInput("");
   };
 
   return (
-    <div className="flex flex-col h-[calc(100vh-4rem)]">
-      {/* Interface do Chat */}
-    </div>
+    <Card>
+      <CardContent className="space-y-4">
+        <h2 className="text-lg font-semibold">Chat com IA</h2>
+        <div className="space-y-2">
+          {messages.map((message) => (
+            <div
+              key={message.id}
+              className={`rounded-md px-3 py-2 text-sm ${
+                message.role === "assistant"
+                  ? "bg-slate-100 text-slate-700"
+                  : "bg-slate-900 text-white"
+              }`}
+            >
+              {message.text}
+            </div>
+          ))}
+        </div>
+        <div className="flex gap-2">
+          <input
+            className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
+            placeholder="Digite sua mensagem"
+            value={input}
+            onChange={(event) => setInput(event.target.value)}
+          />
+          <Button onClick={handleSend}>Enviar</Button>
+        </div>
+      </CardContent>
+    </Card>
   );
 }
 
EOF
)
