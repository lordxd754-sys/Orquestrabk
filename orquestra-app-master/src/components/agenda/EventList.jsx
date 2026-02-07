import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Repeat, Trash2, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const recorrenciaLabels = {
  nenhuma: "Não repete",
  diaria: "Diariamente",
  semanal: "Semanalmente",
  mensal: "Mensalmente",
  dias_especificos: "Dias específicos"
};

const diasSemanaAbrev = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function EventList({ selectedDate, events, onEdit }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Evento.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['eventos']);
    }
  });

  const handleDelete = (event) => {
    if (event.isRecurring) {
      if (confirm('Este é um evento recorrente. Deseja excluir todas as ocorrências?')) {
        deleteMutation.mutate(event.originalID);
      }
    } else {
      deleteMutation.mutate(event.id);
    }
  };

  return (
    <Card className="bg-purple-900/30 backdrop-blur-md border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white">
          {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Listagem de eventos */}
        </div>
      </CardContent>
    </Card>
  );
}
