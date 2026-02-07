 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/CentralConteudo.jsx b/src/pages/CentralConteudo.jsx
index fca60d80f4b6673f1c328ce85632b0a599b0fc34..8e74743f77dcd4738aec1dd6970c249f2b8827ee 100644
--- a/src/pages/CentralConteudo.jsx
+++ b/src/pages/CentralConteudo.jsx
@@ -1,49 +1,27 @@
-import React from "react";
-import { motion } from "framer-motion";
-import SmartNotificationManager from "../components/conteudo/SmartNotificationManager";
-import NotificationSettings from "../components/conteudo/NotificationSettings";
-import StoryPlanner from "../components/conteudo/StoryPlanner";
-import VideoScriptCreator from "../components/conteudo/VideoScriptCreator";
-import ContentIdeasBank from "../components/conteudo/ContentIdeasBank";
-import ContentStrategy from "../components/conteudo/ContentStrategy";
-import NotesInsights from "../components/conteudo/NotesInsights";
-import ContentRadar from "../components/conteudo/ContentRadar";
+import { Card, CardContent } from "@/components/ui/card";
+import { Button } from "@/components/ui/button";
 
 export default function CentralConteudo() {
   return (
-    <div className="min-h-screen p-4 md:p-8">
-      <div className="max-w-7xl mx-auto">
-        <motion.div
-          initial={{ opacity: 0, y: -20 }}
-          animate={{ opacity: 1, y: 0 }}
-          className="mb-8"
-        >
-          <h1 className="text-4xl font-bold text-white mb-2">
-            Central de Criação de Conteúdo 🎬
-          </h1>
-          <p className="text-purple-200 text-lg">
-            Crie conteúdo com consistência, autoridade e estratégia para Instagram
-          </p>
-        </motion.div>
-
-        <div className="space-y-6">
-          <ContentRadar />
-          <SmartNotificationManager />
-          <NotificationSettings />
-          
-          <div className="grid lg:grid-cols-2 gap-6">
-            <StoryPlanner />
-            <VideoScriptCreator />
-          </div>
-
-          <ContentIdeasBank />
-
-          <div className="grid lg:grid-cols-2 gap-6">
-            <ContentStrategy />
-            <NotesInsights />
+    <div className="space-y-4">
+      <Card>
+        <CardContent className="flex items-center justify-between">
+          <div>
+            <h2 className="text-lg font-semibold">Central de Conteúdo</h2>
+            <p className="text-sm text-slate-600">
+              Planeje e acompanhe seu calendário editorial.
+            </p>
           </div>
-        </div>
-      </div>
+          <Button variant="outline">Novo conteúdo</Button>
+        </CardContent>
+      </Card>
+      <Card>
+        <CardContent>
+          <p className="text-sm text-slate-600">
+            Nenhum conteúdo registrado ainda.
+          </p>
+        </CardContent>
+      </Card>
     </div>
   );
 }
 
EOF
)
