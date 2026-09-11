import React, { useState, useRef } from "react";
import { CVData } from "../types";
import { extractTextFromFile, parseCVText } from "../utils/cvParser";
import {
  Upload,
  FileText,
  ClipboardPaste,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface CVImportModalProps {
  onClose: () => void;
  onImport: (importedData: CVData) => void;
}

export const CVImportModal: React.FC<CVImportModalProps> = ({
  onClose,
  onImport,
}) => {
  const [tab, setTab] = useState<"file" | "text">("file");
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewParsed, setPreviewParsed] = useState<CVData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setErrorMessage("");
      setPreviewParsed(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setErrorMessage("");
      setPreviewParsed(null);
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      let rawText = "";
      if (tab === "file") {
        if (!file) {
          setErrorMessage("Por favor, selecione um arquivo primeiro.");
          setIsProcessing(false);
          return;
        }
        rawText = await extractTextFromFile(file);
      } else {
        if (!pastedText.trim()) {
          setErrorMessage("Por favor, cole o texto do currículo.");
          setIsProcessing(false);
          return;
        }
        rawText = pastedText;
      }

      if (!rawText || rawText.trim().length < 20) {
        throw new Error(
          "O conteúdo extraído é muito curto ou ilegível. Tente colar o texto manualmente na aba 'Colar Texto'."
        );
      }

      const parsed = parseCVText(rawText);
      setPreviewParsed(parsed);
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Erro ao processar o arquivo. Tente colar o texto do seu CV diretamente."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = () => {
    if (previewParsed) {
      onImport(previewParsed);
      onClose();
    }
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden text-slate-800 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#162D4A] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white leading-tight">
                Importar CV Antigo
              </h3>
              <p className="text-xs text-slate-200">
                Preencha os campos automaticamente sem perder o design Meu CV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4">
          <button
            onClick={() => {
              setTab("file");
              setErrorMessage("");
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
              tab === "file"
                ? "border-[#1E3A5F] text-[#1E3A5F] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Carregar Arquivo (PDF, Word, TXT)</span>
          </button>
          <button
            onClick={() => {
              setTab("text");
              setErrorMessage("");
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
              tab === "text"
                ? "border-[#1E3A5F] text-[#1E3A5F] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ClipboardPaste className="w-4 h-4" />
            <span>Colar Texto</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {!previewParsed ? (
            <>
              {tab === "file" ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#1E3A5F] rounded-2xl p-8 text-center bg-slate-50/60 hover:bg-slate-50 transition cursor-pointer space-y-3"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {file
                        ? `Arquivo selecionado: ${file.name}`
                        : "Clique para selecionar ou arraste o ficheiro do seu CV"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Suporta ficheiros PDF, Word (.docx) e Texto (.txt)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Cole o conteúdo do seu currículo aqui:
                  </label>
                  <textarea
                    rows={8}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Abra o seu CV antigo, copie o texto todo (Ctrl+A e Ctrl+C) e cole aqui..."
                    className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  ></textarea>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-start gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={isProcessing || (tab === "file" && !file) || (tab === "text" && !pastedText.trim())}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#162D4A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analisando currículo...</span>
                    </>
                  ) : (
                    <>
                      <span>Analisar e Preencher</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* PREVIEW OF EXTRACTED DATA */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">
                    Dados Extraídos com Sucesso!
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    O Meu CV organizou as suas informações. Veja o resumo abaixo:
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-500 block text-[11px]">
                    Nome Detectado:
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {previewParsed.personalInfo.fullName || "(Não detectado)"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block text-[11px]">
                    Cargo / Título:
                  </span>
                  <span className="font-medium text-slate-800">
                    {previewParsed.personalInfo.title || "(Não detectado)"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/70">
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">
                      Email:
                    </span>
                    <span>{previewParsed.personalInfo.email || "—"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">
                      Telefone:
                    </span>
                    <span>{previewParsed.personalInfo.phone || "—"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 text-center">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block font-bold text-[#1E3A5F] text-sm">
                      {previewParsed.experiences.length}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Experiências
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block font-bold text-[#1E3A5F] text-sm">
                      {previewParsed.education.length}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Formações
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block font-bold text-[#1E3A5F] text-sm">
                      {previewParsed.courses.length}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Cursos
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewParsed(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Voltar e Enviar Outro
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aplicar ao Meu CV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

