import React, { useState } from "react";
import { CVData } from "../types";
import {
  getOrderCV,
  validateUnlockCode,
} from "../utils/security";
import {
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface OrderRecoveryModalProps {
  onClose: () => void;
  onRestoreAndUnlock: (recoveredData: CVData | null) => void;
}

export const OrderRecoveryModal: React.FC<OrderRecoveryModalProps> = ({
  onClose,
  onRestoreAndUnlock,
}) => {
  const [orderId, setOrderId] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanOrder = orderId.toUpperCase().trim();
    const cleanCode = unlockCode.toUpperCase().trim();

    if (!cleanOrder) {
      setErrorMessage("Por favor, digite o Código do seu Pedido (ex: CV-12345).");
      return;
    }

    if (!cleanCode) {
      setErrorMessage("Por favor, digite o Código de Desbloqueio enviado no WhatsApp.");
      return;
    }

    setIsValidating(true);

    setTimeout(() => {
      // 1. Validate the unlock code against the order
      const validation = validateUnlockCode(cleanOrder, cleanCode);
      setIsValidating(false);

      if (!validation.success) {
        setErrorMessage(validation.message);
        return;
      }

      // 2. Try to retrieve the saved CV from localStorage
      const savedData = getOrderCV(cleanOrder);

      // 3. Complete recovery
      onRestoreAndUnlock(savedData);
    }, 400);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden text-slate-800 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#162D4A] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold">
              🔑
            </div>
            <div>
              <h3 className="font-bold text-sm text-white leading-tight">
                Recuperar Pedido & Desbloquear
              </h3>
              <p className="text-[11px] text-slate-200">
                Restaure o seu currículo e baixe o seu PDF
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

        {/* Content */}
        <form onSubmit={handleRecover} className="p-6 space-y-4">
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-900 leading-relaxed">
            Se você saiu do site para pagar no WhatsApp e o navegador recarregou a página, digite o <strong>Código do Pedido</strong> (que está na sua mensagem do WhatsApp) e o <strong>Código de Desbloqueio</strong> que o Orlando lhe enviou.
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1. Código do Pedido (está no seu WhatsApp)
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value.toUpperCase());
                  setErrorMessage("");
                }}
                placeholder="Ex: CV-48291"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono uppercase font-bold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Código de Desbloqueio (enviado pelo Orlando)
              </label>
              <input
                type="text"
                value={unlockCode}
                onChange={(e) => {
                  setUnlockCode(e.target.value.toUpperCase());
                  setErrorMessage("");
                }}
                placeholder="Ex: LIB-123456"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono uppercase font-bold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              />
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isValidating || !orderId.trim() || !unlockCode.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#162D4A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isValidating ? "Validando..." : "Recuperar e Desbloquear"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

