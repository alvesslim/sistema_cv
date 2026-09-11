import React, { useState } from "react";
import {
  getSystemConfig,
  buildWhatsAppUrl,
  validateUnlockCode,
} from "../utils/security";
import {
  Lock,
  MessageCircle,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface PaymentModalProps {
  orderId: string;
  clientName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  orderId,
  clientName,
  onClose,
  onSuccess,
}) => {
  const config = getSystemConfig();
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const whatsappLink = buildWhatsAppUrl(
    config.whatsappNumber,
    clientName,
    orderId,
    config.price
  );

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsValidating(true);

    setTimeout(() => {
      const result = validateUnlockCode(orderId, code);
      setIsValidating(false);

      if (result.success) {
        onSuccess();
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient badge */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#162D4A] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer text-sm"
          >
            ✕
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight">
                Desbloquear Download do CV
              </h3>
              <p className="text-xs text-slate-200">
                Seu currículo está pronto e formatado em alta definição
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-300 block">
                Valor para Desbloqueio
              </span>
              <span className="text-xl font-black text-amber-300">
                {config.price}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 block">
                Código do seu Pedido
              </span>
              <button
                onClick={handleCopyOrderId}
                className="inline-flex items-center gap-1.5 font-mono font-bold text-sm bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg transition cursor-pointer"
                title="Copiar código do pedido"
              >
                <span>{orderId}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* STEP 1: WhatsApp Payment */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-emerald-950">
                  Fazer Pagamento via WhatsApp
                </h4>
                <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                  Clique no botão abaixo para conversar diretamente com o
                  Orlando. O WhatsApp abrirá já com o código do seu pedido
                  preenchido para você efetuar o pagamento (Multicaixa Express
                  ou Transferência).
                </p>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pagar no WhatsApp ({config.price})</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* STEP 2: Enter unlock code */}
          <form
            onSubmit={handleValidateCode}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  Inserir Código de Desbloqueio
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Assim que o Orlando confirmar seu pagamento, ele enviará o
                  código exclusivo de liberação no WhatsApp. Digite-o abaixo:
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setErrorMsg("");
                  }}
                  placeholder="Ex: LIB-123456"
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-mono uppercase font-bold tracking-wider border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isValidating || !code.trim()}
                className="w-full py-2.5 px-4 bg-[#1E3A5F] hover:bg-[#162D4A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isValidating ? (
                  <span>Verificando código...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Desbloquear e Baixar CV</span>
                  </>
                )}
              </button>

              {/* Master Test Key shortcut for Orlando */}
              <div className="pt-1.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">É o Orlando a testar?</span>
                <button
                  type="button"
                  onClick={() => {
                    setCode("ORLANDO-VIP-2026");
                    setErrorMsg("");
                    setTimeout(() => {
                      onSuccess();
                    }, 250);
                  }}
                  className="font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                  title="Desbloquear imediatamente usando a Chave Mestra de Testes"
                >
                  Usar Chave Mestra (ORLANDO-VIP-2026)
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
            <span>Pagamento Seguro via Multicaixa / Express</span>
            <span className="text-slate-400 font-medium">Meu CV • Suporte via WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

