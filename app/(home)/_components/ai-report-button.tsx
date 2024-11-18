"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
      toast.success("Relatório gerado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar relatório. Tente novamente mais tarde.");
    } finally {
      setReportIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (report) {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const margin = 15;
      const pageWidth = doc.internal.pageSize.width - 2 * margin;
      const pageHeight = doc.internal.pageSize.height - 2 * margin;
      let currentY = margin;

      // Adicionar logotipo
      const logoUrl = "/logotipo-185X47.png";
      const img = new Image();
      img.src = logoUrl;

      img.onload = () => {
        doc.addImage(img, "PNG", margin, currentY, 40, 15);
        currentY += 30;

        // Título
        doc.setFont("calibri", "bold");
        doc.setFontSize(14);
        doc.text(
          "Relatório IA Fintrack - Análise Financeira",
          margin,
          currentY,
        );
        currentY += 20;

        // Processar texto e substituir traços por marcadores
        const cleanedReport = report
          .replace(/^- /gm, " ") // Substituir traços no início das linhas por marcadores
          .replace(/^---/gm, "") // Substituir traços no início das linhas por marcadores
          .replace(/#/g, "") // Remover hashtags do Markdown
          .replace(/\*\*/g, "") // Remover negrito Markdown
          .split("\n");

        cleanedReport.forEach((line) => {
          if (currentY > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
          }

          // Renderizar listas e texto
          if (line.startsWith("•")) {
            doc.setFont("calibri", "normal");
            doc.setFontSize(10);
            const wrappedText = doc.splitTextToSize(
              line.trim(),
              pageWidth - 10,
            );
            wrappedText.forEach((textLine: string) => {
              doc.text(textLine, margin + 5, currentY); // Indentação para marcadores
              currentY += 5;
            });
          } else if (line.trim()) {
            doc.setFont("calibri", "normal");
            doc.setFontSize(10);
            const wrappedText = doc.splitTextToSize(line.trim(), pageWidth);
            wrappedText.forEach((textLine: string) => {
              doc.text(textLine, margin, currentY);
              currentY += 5;
            });
          }

          currentY += 2; // Espaçamento entre blocos
        });

        // Rodapé com numeração de páginas
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.text(
            `Página ${i} de ${pageCount}`,
            margin,
            doc.internal.pageSize.height - margin,
          );
          doc.text(
            `Gerado em: ${new Date().toLocaleDateString()} por Fintrack.AI`,
            pageWidth - 50,
            doc.internal.pageSize.height - margin,
          );
        }

        doc.save(`FintrackAI_Relatorio-${month}.pdf`);
      };
    } else {
      toast.error("Nenhum relatório disponível para download.");
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link">
          <span className="hidden md:flex">Relatório IA</span>
          <BotIcon size={30} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
              {report && (
                <Button onClick={handleDownloadPDF}>Baixar PDF</Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
