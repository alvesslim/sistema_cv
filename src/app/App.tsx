import React, { useState, useEffect, useCallback } from "react";
import { CVData, sampleCVData } from "./types";
import { CVEditor } from "./components/CVEditor";
import { CVDocument } from "./components/CVDocument";
import { PaymentModal } from "./components/PaymentModal";
import { AdminModal } from "./components/AdminModal";
import { OrderRecoveryModal } from "./components/OrderRecoveryModal";
import { LandingPage } from "./components/LandingPage";
import { generateRandomOrderId, saveOrderCV } from "./utils/security";
import {
  Download,
  Eye,
  Edit3,
  Columns,
  CheckCircle2,
  XCircle,
  Lock,
  ShieldCheck,
  KeyRound,
  Printer,
} from "lucide-react";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem("cv_system_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed?.personalInfo?.fullName?.includes("ARLINDO") ||
          parsed?.personalInfo?.phone?.includes("925-341-312")
        ) {
          localStorage.setItem("cv_system_data", JSON.stringify(sampleCVData));
          return sampleCVData;
        }
        return parsed;
      } catch (e) {
        return sampleCVData;
      }
    }
    return sampleCVData;
  });

  const [zoom, setZoom] = useState<number>(() => {
    if (window.innerWidth < 640) return 40; // Scale down A4 for phones
    if (window.innerWidth < 1024) return 60; // Scale down for tablets
    return 85; // Default desktop zoom
  });
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">(() => {
    // Return 'editor' for mobile/tablets, 'split' for large desktop screens
    return window.innerWidth < 1024 ? "editor" : "split";
  });

  // Unique order ID for this session/customer
  const [orderId] = useState<string>(() => {
    const saved = sessionStorage.getItem("cv_session_order_id");
    if (saved) return saved;
    const newId = generateRandomOrderId();
    sessionStorage.setItem("cv_session_order_id", newId);
    return newId;
  });

  // Unlock state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("cv_unlocked_session") === "true";
  });

  const isAdminRoute = currentPath.toLowerCase() === "/admin" || currentPath.toLowerCase() === "/admin/";

  // Modals state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Sync with localStorage & save order backup immediately
  useEffect(() => {
    localStorage.setItem("cv_system_data", JSON.stringify(cvData));
    saveOrderCV(orderId, cvData);
    if (cvData.personalInfo.fullName) {
      document.title = `Meu CV - ${cvData.personalInfo.fullName}`;
    }
  }, [cvData, orderId]);

  const handleDownloadClick = () => {
    if (!isUnlocked) {
      setShowPaymentModal(true);
    } else {
      setShowPrintModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    sessionStorage.setItem("cv_unlocked_session", "true");
    setShowPaymentModal(false);
    setShowPrintModal(true);
  };

  const handleRestoreAndUnlock = (recoveredData: CVData | null) => {
    if (recoveredData) {
      setCVData(recoveredData);
      localStorage.setItem("cv_system_data", JSON.stringify(recoveredData));
    }
    setIsUnlocked(true);
    sessionStorage.setItem("cv_unlocked_session", "true");
    setShowRecoveryModal(false);
    setShowPrintModal(true);
  };

  const handlePrint = () => {
    setShowPrintModal(false);
    
    // Call print directly to avoid popup blockers or Safari print restrictions
    // We do not need to change viewMode because #cv-print-root is always in DOM
    setTimeout(() => {
      window.print();
    }, 50);
  };

  if (currentPath === "/" || currentPath === "") {
    return <LandingPage onStart={() => navigate("/editor")} />;
  }

  return (
    <div className="min-h-screen bg-[#EAECEF] flex flex-col selection:bg-slate-200">
      {/* ================= HEADER TOOLBAR (HIDDEN ON PRINT) ================= */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 lg:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-sm tracking-tight">
              CV
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 leading-tight flex items-center gap-2">
                <span>Meu CV</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Pro
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[170px] sm:max-w-xs">
                {cvData.personalInfo.fullName || "Novo Currículo"}
              </p>
            </div>
          </div>

          {/* Center view toggles */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode("editor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                viewMode === "editor"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Formulário</span>
            </button>

            <button
              onClick={() => setViewMode("split")}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                viewMode === "split"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Lado a Lado</span>
            </button>

            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                viewMode === "preview"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visualizar CV</span>
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Status badge */}
            {isUnlocked ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Download Liberado</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>5.000 Kz</span>
              </span>
            )}

            {/* Zoom Controls */}
            {viewMode !== "editor" && (
              <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="px-2 py-1 rounded hover:bg-white text-slate-700 transition cursor-pointer"
                  title="Reduzir zoom"
                >
                  -
                </button>
                <span className="px-2 text-slate-600 font-semibold">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(110, zoom + 10))}
                  className="px-2 py-1 rounded hover:bg-white text-slate-700 transition cursor-pointer"
                  title="Aumentar zoom"
                >
                  +
                </button>
              </div>
            )}

            {/* Recover Order button */}
            <button
              onClick={() => setShowRecoveryModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition cursor-pointer"
              title="Já fez o pagamento e recebeu o código? Recupere seu CV e baixe o PDF"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Já tenho Pedido</span>
              <span className="sm:hidden">Recuperar</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={handleDownloadClick}
              className={`flex items-center gap-2 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer ${
                isUnlocked
                  ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20"
                  : "bg-[#1E3A5F] hover:bg-[#162D4A] text-white shadow-[#1E3A5F]/20"
              }`}
            >
              {isUnlocked ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>Baixar CV (PDF)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Baixar CV (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="no-print flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-6">
        <div
          className={`h-[calc(100vh-100px)] ${
            viewMode === "split"
              ? "grid grid-cols-1 lg:grid-cols-12 gap-6"
              : "block max-w-4xl mx-auto"
          }`}
        >
          {/* LEFT: FORM EDITOR */}
          {(viewMode === "split" || viewMode === "editor") && (
            <div
              className={`h-full ${
                viewMode === "split" ? "lg:col-span-6 xl:col-span-5" : "w-full"
              }`}
            >
              <CVEditor data={cvData} onChange={setCVData} />
            </div>
          )}

          {/* RIGHT: LIVE PREVIEW OF DOCUMENT */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div
              className={`h-full overflow-y-auto rounded-2xl bg-slate-200/60 border border-slate-300/60 p-4 sm:p-6 flex flex-col items-center cv-preview-wrapper ${
                viewMode === "split" ? "lg:col-span-6 xl:col-span-7" : "w-full"
              }`}
            >
              {/* Floating notification bar above sheets */}
              <div className="no-print w-full max-w-[210mm] mb-4 bg-white/90 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold">Pré-visualização A4</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">2 Páginas Atualizadas</span>
                </div>
                <button
                  onClick={handleDownloadClick}
                  className="text-[#1E3A5F] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {isUnlocked ? (
                    <>
                      <Printer className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Imprimir / Salvar PDF</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Desbloquear para Baixar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scaled A4 sheets */}
              <div className="w-full overflow-x-auto flex justify-start sm:justify-center pb-8">
                <div
                  className="transition-transform origin-top"
                  style={{
                    transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
                    minWidth: "210mm",
                  }}
                >
                  <CVDocument data={cvData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= PAYMENT MODAL (WHATSAPP GATEWAY) ================= */}
      {showPaymentModal && (
        <PaymentModal
          orderId={orderId}
          clientName={cvData.personalInfo.fullName}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* ================= ORDER RECOVERY MODAL ================= */}
      {showRecoveryModal && (
        <OrderRecoveryModal
          onClose={() => setShowRecoveryModal(false)}
          onRestoreAndUnlock={handleRestoreAndUnlock}
        />
      )}

      {/* ================= ADMIN MODAL (HIDDEN ROUTE /admin ONLY) ================= */}
        {isAdminRoute && (
          <AdminModal
            onClose={() => {
              navigate("/");
            }}
          />
        )}

      {/* ================= PRINT INSTRUCTIONS MODAL ================= */}
      {showPrintModal && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowPrintModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-slate-800 relative border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">
                  ✓
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  Instruções para o PDF Perfeito
                </h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Para que a folha saia <strong>100% limpa</strong> (sem data, link
              ou título nas bordas), configure a janela de impressão da seguinte
              forma:
            </p>

            <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-xs mb-5">
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    Desmarque "Cabeçalhos e rodapés"
                  </strong>
                  <p className="text-slate-500 text-[11px]">
                    (Remove a data, o link do site e o título das margens).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    Marque "Gráficos de segundo plano"
                  </strong>
                  <p className="text-slate-500 text-[11px]">
                    (Preserva as cores das tags e o selo de mérito).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    Destino: "Guardar como PDF"
                  </strong>
                  <p className="text-slate-500 text-[11px]">
                    (Para salvar no seu computador ou telemóvel).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#162D4A] active:scale-95 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-[#1E3A5F]/20 transition cursor-pointer"
              >
                <span>Abrir Impressão e Salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRINT-DEDICATED ROOT ================= */}
      {/* Hidden on screen, visible only when printing to ensure 100% full-page output */}
      <div id="cv-print-root" className="hidden print:block">
        <CVDocument data={cvData} />
      </div>
    </div>
  );
}
