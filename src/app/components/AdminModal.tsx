import React, { useState } from "react";
import {
  getSystemConfig,
  saveSystemConfig,
  generateUnlockCode,
  SystemConfig,
} from "../utils/security";
import {
  ShieldAlert,
  Key,
  Copy,
  Check,
  Settings,
  Sparkles,
  Save,
  MessageSquare,
} from "lucide-react";

interface AdminModalProps {
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<SystemConfig>(getSystemConfig());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Code generator state
  const [clientOrderId, setClientOrderId] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Settings form state
  const [phoneVal, setPhoneVal] = useState(config.whatsappNumber);
  const [priceVal, setPriceVal] = useState(config.price);
  const [adminPassVal, setAdminPassVal] = useState(config.adminPassword);
  const [masterKeyVal, setMasterKeyVal] = useState(config.masterKeyEnabled || false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === config.adminPassword || passwordInput === "orlando2026") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Senha incorreta. Tente novamente.");
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientOrderId.trim()) return;
    const code = generateUnlockCode(clientOrderId.trim());
    setGeneratedCode(code);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyWhatsAppMsg = () => {
    const msg = `Pagamento confirmado com sucesso! ✅\n\nO seu código de desbloqueio exclusivo é:\n👉 *${generatedCode}*\n\nBasta digitar este código na janela do sistema para baixar o seu currículo em PDF. Muito obrigado pela preferência!`;
    navigator.clipboard.writeText(msg);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveSystemConfig({
      ...config,
      whatsappNumber: phoneVal.trim(),
      price: priceVal.trim(),
      adminPassword: adminPassVal.trim(),
      masterKeyEnabled: masterKeyVal,
    });
    setConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-bold text-sm text-white leading-tight">
                Painel do Administrador (Orlando)
              </h3>
              <p className="text-[11px] text-slate-400">
                Gerador de Códigos & Configurações de Pagamento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
              title="Voltar para a página inicial do Meu CV"
            >
              ← Voltar ao Meu CV
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer text-sm"
              title="Fechar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* LOGIN VIEW */
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Key className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Acesso Restrito
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Digite a senha de administrador para gerar códigos e gerenciar pagamentos.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Senha de administrador"
                autoFocus
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-center tracking-widest font-mono"
              />
              {loginError && (
                <p className="text-xs text-red-600 text-center font-medium">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
            >
              Entrar no Painel
            </button>
          </form>
        ) : (
          /* ADMIN DASHBOARD VIEW */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* SECTION 1: INSTANT CODE GENERATOR */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Gerar Código de Desbloqueio para Cliente</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Digite o <strong>Código do Pedido</strong> que o cliente enviou no WhatsApp (ex: <code>CV-48291</code>) para gerar o código de liberação dele:
              </p>

              <form onSubmit={handleGenerate} className="flex gap-2">
                <input
                  type="text"
                  value={clientOrderId}
                  onChange={(e) => setClientOrderId(e.target.value.toUpperCase())}
                  placeholder="Ex: CV-48291"
                  className="flex-1 px-3 py-2 text-xs font-mono font-bold uppercase border border-amber-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                >
                  Gerar Código
                </button>
              </form>

              {/* Display Generated Code */}
              {generatedCode && (
                <div className="mt-3 bg-white p-3.5 rounded-xl border border-amber-300 space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Código de Desbloqueio Gerado:
                    </span>
                    <span className="font-mono text-base font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {generatedCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold rounded-lg transition cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyWhatsAppMsg}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-[11px] font-semibold rounded-lg transition cursor-pointer border border-[#25D366]/30"
                    >
                      {copiedMsg ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Mensagem Copiada!</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-3.5 h-3.5 text-[#128C7E]" />
                          <span>Copiar Mensagem WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: SYSTEM CONFIGURATION */}
            <form onSubmit={handleSaveSettings} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Settings className="w-4 h-4 text-slate-600" />
                <span>Configurações do Sistema</span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Número de WhatsApp (com código do país 244)
                  </label>
                  <input
                    type="text"
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    placeholder="244946554601"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Valor do Currículo em Kwanzas
                  </label>
                  <input
                    type="text"
                    value={priceVal}
                    onChange={(e) => setPriceVal(e.target.value)}
                    placeholder="5.000 Kz"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Senha do Painel Admin
                  </label>
                  <input
                    type="text"
                    value={adminPassVal}
                    onChange={(e) => setAdminPassVal(e.target.value)}
                    placeholder="orlando2026"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    id="masterKeyToggle"
                    checked={masterKeyVal}
                    onChange={(e) => setMasterKeyVal(e.target.checked)}
                    className="w-3.5 h-3.5 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                  />
                  <label htmlFor="masterKeyToggle" className="text-[11px] font-semibold text-slate-700 cursor-pointer">
                    Activar botão da "Chave Mestra" (Testes)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {saveSuccess ? (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
                  </span>
                ) : (
                  <span></span>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>

            {/* SECTION 3: MASTER TEST KEY */}
            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold block text-blue-900">
                    Chave Mestra de Testes:
                  </span>
                  <span className="font-mono text-sm font-black text-blue-800">
                    ORLANDO-VIP-2026
                  </span>
                </div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        sessionStorage.setItem("cv_unlocked_session", "true");
                        alert("✅ Download liberado para testes!");
                      }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                      title="Libera o download imediatamente neste navegador"
                    >
                      Desbloquear Download Agora
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sessionStorage.removeItem("cv_unlocked_session");
                        alert("🔒 Downloads bloqueados!\nO próximo clique exigirá a Chave Mestra ou o código.");
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                      title="Bloqueia o download novamente neste navegador"
                    >
                      Bloquear para Testar Pagamento
                    </button>
                  </div>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                Você pode digitar <strong>ORLANDO-VIP-2026</strong> na janela de pagamento ou clicar no botão acima para liberar downloads ilimitados de teste neste navegador.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

