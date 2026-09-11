import React from "react";
import { ArrowRight, CheckCircle2, FileText, Zap, ShieldCheck, Star } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#1E3A5F] selection:text-white font-sans overflow-x-hidden flex flex-col relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#2A4C7A] flex items-center justify-center text-white font-black text-sm shadow-md border border-white/10">
              CV
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight flex items-center gap-2">
              Meu CV
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 shadow-sm">
                Pro
              </span>
            </span>
          </div>
          <button
            onClick={onStart}
            className="text-sm font-bold text-[#1E3A5F] hover:text-blue-600 transition cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            Entrar no Editor
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 shadow-sm text-emerald-800 text-xs font-bold uppercase tracking-wider mb-8 animate-in slide-in-from-bottom-4 duration-700 fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Estrutura 100% Optimizada para Sistemas ATS
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-8 duration-700 fade-in delay-100">
            Passe nos filtros invisíveis das empresas. <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] via-blue-600 to-[#10B981]">
              Crie um CV Profissional.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12 animate-in slide-in-from-bottom-8 duration-700 fade-in delay-200">
            A maioria dos currículos nunca é lida por humanos. Eles são sumariamente rejeitados por sistemas automáticos (ATS) devido a excesso de design, má organização e falta de palavras-chave. <strong>Eleve as suas chances de contratação com uma estrutura limpa, executiva e altamente convertível.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-700 fade-in delay-300">
            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#1E3A5F]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Criar o Meu CV Grátis Agora
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 font-medium animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span>Usado por centenas de candidatos de sucesso</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-100 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-transform">
              <FileText className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Leitura Impecável</h3>
            <p className="text-slate-600 leading-relaxed">
              Design executivo clássico e minimalista. Foi rigorosamente testado por profissionais de RH para garantir compatibilidade total com algoritmos de triagem (ATS).
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-emerald-100 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Zap className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-transform relative z-10">
              <Zap className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 relative z-10">Integração com IA</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Copie instantaneamente uma instrução de base (Prompt) concebida para qualquer Assistente Virtual preencher e redigir o seu currículo de forma persuasiva.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-100 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-transform">
              <CheckCircle2 className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Ajuste Automático</h3>
            <p className="text-slate-600 leading-relaxed">
              Diga adeus às lutas intermináveis com margens no Word. A plataforma ajusta inteligentemente o espaçamento para caber perfeitamente numa folha A4.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400 font-black text-sm mb-4">
            CV
          </div>
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Meu CV Pro. O passaporte para a sua próxima oportunidade.
          </p>
        </div>
      </footer>
    </div>
  );
};

