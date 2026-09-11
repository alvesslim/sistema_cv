import React, { useState } from "react";
import {
  CVData,
  sampleCVData,
  emptyCVData,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  CourseCertificationItem,
  RecognitionItem,
  LanguageItem,
} from "../types";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  X,
  FileUp,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { CVImportModal } from "./CVImportModal";

interface CVEditorProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "skills" | "experience" | "education" | "extras"
  >("personal");
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});
  const [newBehavioralInput, setNewBehavioralInput] = useState("");

  // Personal info update
  const handlePersonalChange = (
    field: keyof typeof data.personalInfo,
    value: string
  ) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Technical Skills operations
  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      category: "NOVA CATEGORIA:",
      skills: ["Exemplo 1"],
    };
    onChange({
      ...data,
      technicalSkills: [...data.technicalSkills, newCat],
    });
  };

  const handleUpdateCategoryTitle = (catId: string, title: string) => {
    onChange({
      ...data,
      technicalSkills: data.technicalSkills.map((c) =>
        c.id === catId ? { ...c, category: title } : c
      ),
    });
  };

  const handleRemoveCategory = (catId: string) => {
    onChange({
      ...data,
      technicalSkills: data.technicalSkills.filter((c) => c.id !== catId),
    });
  };

  const handleAddSkillToCat = (catId: string) => {
    const val = (newSkillInput[catId] || "").trim();
    if (!val) return;
    onChange({
      ...data,
      technicalSkills: data.technicalSkills.map((c) =>
        c.id === catId ? { ...c, skills: [...c.skills, val] } : c
      ),
    });
    setNewSkillInput({ ...newSkillInput, [catId]: "" });
  };

  const handleRemoveSkillFromCat = (catId: string, skillIdx: number) => {
    onChange({
      ...data,
      technicalSkills: data.technicalSkills.map((c) =>
        c.id === catId
          ? { ...c, skills: c.skills.filter((_, i) => i !== skillIdx) }
          : c
      ),
    });
  };

  // Behavioral Skills operations
  const handleAddBehavioral = () => {
    const val = newBehavioralInput.trim();
    if (!val) return;
    onChange({
      ...data,
      behavioralSkills: [...data.behavioralSkills, val],
    });
    setNewBehavioralInput("");
  };

  const handleRemoveBehavioral = (idx: number) => {
    onChange({
      ...data,
      behavioralSkills: data.behavioralSkills.filter((_, i) => i !== idx),
    });
  };

  // Experience operations
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Novo Cargo",
      company: "Empresa",
      location: "Luanda, Angola",
      period: "2024 – Atual",
      bullets: ["Descrição da principal responsabilidade ou conquista."],
    };
    onChange({
      ...data,
      experiences: [newExp, ...data.experiences],
    });
  };

  const handleUpdateExperience = (
    expId: string,
    field: keyof ExperienceItem,
    value: any
  ) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const handleAddBulletToExp = (expId: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: [...exp.bullets, "Nova responsabilidade/tarefa"] }
          : exp
      ),
    });
  };

  const handleUpdateBullet = (
    expId: string,
    bulletIdx: number,
    value: string
  ) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === bulletIdx ? value : b)),
            }
          : exp
      ),
    });
  };

  const handleRemoveBullet = (expId: string, bulletIdx: number) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.filter((_, i) => i !== bulletIdx),
            }
          : exp
      ),
    });
  };

  const handleRemoveExperience = (expId: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== expId),
    });
  };

  // Education operations
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "Nome da Licenciatura / Curso",
      institution: "Instituição de Ensino",
      location: "Luanda",
      year: "Concluído",
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const handleUpdateEducation = (
    eduId: string,
    field: keyof EducationItem,
    value: string
  ) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === eduId ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const handleRemoveEducation = (eduId: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== eduId),
    });
  };

  // Courses operations
  const handleAddCourse = () => {
    const newCourse: CourseCertificationItem = {
      id: `course-${Date.now()}`,
      title: "Nome do Curso / Certificação",
      issuerLocation: "Entidade / Luanda | 2026",
    };
    onChange({
      ...data,
      courses: [...data.courses, newCourse],
    });
  };

  const handleUpdateCourse = (
    courseId: string,
    field: keyof CourseCertificationItem,
    value: string
  ) => {
    onChange({
      ...data,
      courses: data.courses.map((c) =>
        c.id === courseId ? { ...c, [field]: value } : c
      ),
    });
  };

  const handleRemoveCourse = (courseId: string) => {
    onChange({
      ...data,
      courses: data.courses.filter((c) => c.id !== courseId),
    });
  };

  // Recognitions operations
  const handleAddRecognition = () => {
    const newRec: RecognitionItem = {
      id: `rec-${Date.now()}`,
      badge: "MÉRITO",
      title: "Diploma ou Certificado de Reconhecimento",
      issuerLocation: "Instituição Emissora | Local | 2026",
    };
    onChange({
      ...data,
      recognitions: [...data.recognitions, newRec],
    });
  };

  const handleUpdateRecognition = (
    recId: string,
    field: keyof RecognitionItem,
    value: string
  ) => {
    onChange({
      ...data,
      recognitions: data.recognitions.map((r) =>
        r.id === recId ? { ...r, [field]: value } : r
      ),
    });
  };

  const handleRemoveRecognition = (recId: string) => {
    onChange({
      ...data,
      recognitions: data.recognitions.filter((r) => r.id !== recId),
    });
  };

  // Languages operations
  const handleAddLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: "Novo Idioma",
      level: "Intermediário",
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang],
    });
  };

  const handleUpdateLanguage = (
    langId: string,
    field: keyof LanguageItem,
    value: string
  ) => {
    onChange({
      ...data,
      languages: data.languages.map((l) =>
        l.id === langId ? { ...l, [field]: value } : l
      ),
    });
  };

  const handleRemoveLanguage = (langId: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== langId),
    });
  };

  const [isPromptCopied, setIsPromptCopied] = useState(false);

  const handleCopyPrompt = () => {
    const promptText = `Quero que me ajudes a criar o meu currículo. Actua como um especialista em Recursos Humanos. Vou fornecer-te as minhas informações, e tu deves escrevê-las e organizá-las exactamente com a seguinte estrutura de tópicos, para que eu as possa importar directamente para a minha plataforma de currículos ATS:

1. IDENTIFICAÇÃO: (Nome Completo, Cargo, Telefone, Email, Localização)
2. PERFIL PROFISSIONAL: (Resumo de impacto, cerca de 3 a 5 linhas)
3. COMPETÊNCIAS TÉCNICAS: (Agrupadas por categoria, ex: Linguagens, Ferramentas, Sistemas)
4. COMPETÊNCIAS COMPORTAMENTAIS: (Ex: Liderança, Comunicação, Resolução de Problemas)
5. EXPERIÊNCIAS PROFISSIONAIS: (Para cada uma indicar: Empresa, Cargo, Período, Localização, e Descrição estruturada em tópicos de responsabilidades e conquistas)
6. FORMAÇÕES ACADÉMICAS: (Instituição, Curso, Ano, Localização)
7. MÉRITOS E IDIOMAS: (Prémios, Cursos extra, Certificações, Níveis de Idioma)

Pergunta-me agora pela minha experiência profissional e dados para começarmos.`;

    navigator.clipboard.writeText(promptText).then(() => {
      setIsPromptCopied(true);
      setTimeout(() => setIsPromptCopied(false), 2500);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md flex flex-col lg:h-full lg:overflow-hidden">
      {/* Top action toolbar for editor */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Editor de Currículo
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-300 hover:bg-blue-100 text-blue-900 shadow-sm transition cursor-pointer"
            title="Importar dados de um currículo antigo em PDF, Word (.docx) ou Texto"
          >
            <FileUp className="w-3.5 h-3.5 text-blue-600" />
            <span>📄 Importar CV Antigo</span>
          </button>

          <button
            onClick={() => onChange(sampleCVData)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 shadow-sm transition cursor-pointer"
            title="Preencher com exemplo profissional para você apenas alterar os dados"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>✨ Preencher com Exemplo</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm transition cursor-pointer ${
              isPromptCopied 
                ? "bg-emerald-50 border-emerald-300 text-emerald-800" 
                : "bg-indigo-50 border-indigo-300 hover:bg-indigo-100 text-indigo-900"
            }`}
            title="Copiar estrutura para o ChatGPT preencher o currículo por si"
          >
            {isPromptCopied ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-indigo-600" />
            )}
            <span>{isPromptCopied ? "Prompt Copiado!" : "Copiar Prompt para IA"}</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Tens a certeza que queres limpar todo o currículo?")) {
                onChange({
                  personalInfo: { fullName: "", title: "", email: "", phone: "", location: "" },
                  profile: "",
                  technicalSkills: [{ id: "ts-1", category: "Categoria (Ex: Informática)", skills: ["Habilidade 1", "Habilidade 2"] }],
                  behavioralSkills: ["Ex: Liderança", "Ex: Trabalho em equipa"],
                  experiences: [{
                    id: "exp-1",
                    role: "Ex: Assistente Administrativo",
                    company: "Ex: Nome da Empresa",
                    location: "Ex: Luanda, Angola",
                    period: "Ex: 2023 - Presente",
                    bullets: ["Descreva aqui as suas principais funções e responsabilidades.", "Mencione resultados ou conquistas importantes."]
                  }],
                  education: [{
                    id: "edu-1",
                    degree: "Ex: Licenciatura em Gestão",
                    institution: "Ex: Universidade Agostinho Neto",
                    location: "Ex: Luanda",
                    year: "Ex: 2024"
                  }],
                  courses: [{
                    id: "c-1",
                    title: "Ex: Curso de Secretariado",
                    issuerLocation: "Ex: Centro de Formação Profissional | 2025"
                  }],
                  recognitions: [],
                  languages: [{
                    id: "l-1",
                    language: "Ex: Inglês",
                    level: "Ex: Intermédio"
                  }]
                });
              }
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm transition cursor-pointer"
            title="Limpar todos os campos para preencher do zero"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Novo Formulário em Branco</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 bg-white overflow-x-auto scrollbar-none px-2">
        <TabButton
          active={activeTab === "personal"}
          onClick={() => setActiveTab("personal")}
          icon={<User className="w-4 h-4" />}
          label="Identificação"
        />
        <TabButton
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
          icon={<Wrench className="w-4 h-4" />}
          label="Competências"
        />
        <TabButton
          active={activeTab === "experience"}
          onClick={() => setActiveTab("experience")}
          icon={<Briefcase className="w-4 h-4" />}
          label="Experiências"
        />
        <TabButton
          active={activeTab === "education"}
          onClick={() => setActiveTab("education")}
          icon={<GraduationCap className="w-4 h-4" />}
          label="Formações"
        />
        <TabButton
          active={activeTab === "extras"}
          onClick={() => setActiveTab("extras")}
          icon={<Award className="w-4 h-4" />}
          label="Méritos & Idiomas"
        />
      </div>

      {/* Tab Contents */}
      <div className="p-5 lg:overflow-y-auto flex-1 space-y-5">
        {/* ================= TAB: PERSONAL & PROFILE ================= */}
        {activeTab === "personal" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800 mb-1">
                Dados Pessoais & Cabeçalho
              </h2>
              <p className="text-xs text-slate-500">
                Informações principais exibidas no topo do currículo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) =>
                    handlePersonalChange("fullName", e.target.value)
                  }
                  placeholder="Ex: ARLINDO JOSÉ DOS SANTOS MIGUEL"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cargo / Subtítulo Profissional
                </label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalChange("title", e.target.value)}
                  placeholder="Ex: Técnico Informático | Segurança da Informação | Redes & Sistemas"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) =>
                    handlePersonalChange("location", e.target.value)
                  }
                  placeholder="Ex: Luanda, Angola"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalChange("phone", e.target.value)}
                  placeholder="Ex: (+244) 925-341-312"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalChange("email", e.target.value)}
                  placeholder="Ex: arlindomiguell28@gmail.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>
            </div>

            <hr className="border-slate-200 my-4" />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Perfil Profissional (Resumo / Bio)
                </label>
                <span className="text-[11px] text-slate-400">
                  {data.profile.length} caracteres
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Destaque a sua formação acadêmica, especialidades técnicas,
                certificações e diferenciais.
              </p>
              <textarea
                rows={5}
                value={data.profile}
                onChange={(e) => onChange({ ...data, profile: e.target.value })}
                placeholder="Escreva aqui uma síntese profissional impactante..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent leading-relaxed"
              ></textarea>
            </div>
          </div>
        )}

        {/* ================= TAB: SKILLS ================= */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            {/* Technical Skills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Competências Técnicas
                  </h2>
                  <p className="text-xs text-slate-500">
                    Categorias com pílulas e tags de habilidades.
                  </p>
                </div>
                <button
                  onClick={handleAddCategory}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nova Categoria</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.technicalSkills.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={cat.category}
                        onChange={(e) =>
                          handleUpdateCategoryTitle(cat.id, e.target.value)
                        }
                        placeholder="NOME DA CATEGORIA:"
                        className="font-bold text-xs uppercase px-2 py-1 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] flex-1 max-w-[240px]"
                      />
                      <button
                        onClick={() => handleRemoveCategory(cat.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition cursor-pointer"
                        title="Remover categoria inteira"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF3F8] text-[#1E3A5F] text-xs font-medium border border-[#DCE4EC]"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() =>
                              handleRemoveSkillFromCat(cat.id, sIdx)
                            }
                            className="text-[#1E3A5F]/60 hover:text-red-600 transition cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {/* Add skill input */}
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          value={newSkillInput[cat.id] || ""}
                          onChange={(e) =>
                            setNewSkillInput({
                              ...newSkillInput,
                              [cat.id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkillToCat(cat.id);
                            }
                          }}
                          placeholder="+ Adicionar (Enter)"
                          className="px-2 py-1 text-xs border border-dashed border-slate-300 rounded bg-white focus:outline-none focus:border-slate-500 w-32"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkillToCat(cat.id)}
                          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Behavioral Skills */}
            <div>
              <div className="mb-2">
                <h2 className="text-sm font-bold text-slate-800">
                  Competências Comportamentais (Soft Skills)
                </h2>
                <p className="text-xs text-slate-500">
                  Apresentadas em duas colunas elegantes no currículo.
                </p>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newBehavioralInput}
                  onChange={(e) => setNewBehavioralInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBehavioral();
                    }
                  }}
                  placeholder="Ex: Liderança, Comunicação, Pontualidade..."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                />
                <button
                  type="button"
                  onClick={handleAddBehavioral}
                  className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#162D4A] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Adicionar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.behavioralSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  >
                    <span>— {skill}</span>
                    <button
                      onClick={() => handleRemoveBehavioral(idx)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: EXPERIENCE ================= */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Experiência Profissional
                </h2>
                <p className="text-xs text-slate-500">
                  Histórico de cargos, empresas e conquistas.
                </p>
              </div>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Experiência</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Cargo / Função
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "role",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Programador Web"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Período
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "period",
                              e.target.value
                            )
                          }
                          placeholder="Ex: 2018 – 2019 ou 2022 – Atual"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Empresa / Organização
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "company",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Kwanza Online"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Localização
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) =>
                            handleUpdateExperience(
                              exp.id,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Luanda, Angola"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition cursor-pointer"
                      title="Excluir esta experiência"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Atividades & Conquistas (Tópicos com travessão):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddBulletToExp(exp.id)}
                        className="text-[11px] font-semibold text-[#1E3A5F] hover:underline cursor-pointer"
                      >
                        + Adicionar tópico
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <span className="text-slate-400 font-bold">—</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) =>
                              handleUpdateBullet(exp.id, bIdx, e.target.value)
                            }
                            placeholder="Descreva uma atividade ou conquista..."
                            className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                          />
                          <button
                            onClick={() => handleRemoveBullet(exp.id, bIdx)}
                            className="text-slate-400 hover:text-red-500 p-1 transition cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB: EDUCATION & COURSES ================= */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {/* Formação Acadêmica */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Formação Acadêmica
                  </h2>
                  <p className="text-xs text-slate-500">
                    Licenciaturas, Ensino Médio, Mestrados, etc.
                  </p>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Formação</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Curso / Grau Acadêmico
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleUpdateEducation(
                              edu.id,
                              "degree",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Licenciatura em Informática de Gestão"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Instituição de Ensino
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) =>
                            handleUpdateEducation(
                              edu.id,
                              "institution",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Universidade Gregório Semedo (UGS)"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Local e Ano / Estado
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) =>
                            handleUpdateEducation(edu.id, "year", e.target.value)
                          }
                          placeholder="Ex: Luanda | Concluído"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Formação Complementar & Certificações */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Formação Complementar & Certificações
                  </h2>
                  <p className="text-xs text-slate-500">
                    Cursos profissionais, workshops e certificações de
                    segurança/TI.
                  </p>
                </div>
                <button
                  onClick={handleAddCourse}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Curso</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Nome do Curso / Certificação
                        </label>
                        <input
                          type="text"
                          value={course.title}
                          onChange={(e) =>
                            handleUpdateCourse(
                              course.id,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Curso de Formação — Vídeovigilância (CCTV)..."
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Entidade / Local | Ano
                        </label>
                        <input
                          type="text"
                          value={course.issuerLocation}
                          onChange={(e) =>
                            handleUpdateCourse(
                              course.id,
                              "issuerLocation",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Luanda | 2026"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: RECOGNITIONS & LANGUAGES ================= */}
        {activeTab === "extras" && (
          <div className="space-y-6">
            {/* Reconhecimentos & Distinções */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Reconhecimentos & Distinções
                  </h2>
                  <p className="text-xs text-slate-500">
                    Diplomas de mérito, distinções de serviço e prémios.
                  </p>
                </div>
                <button
                  onClick={handleAddRecognition}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Mérito</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.recognitions.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Badge / Selo
                        </label>
                        <input
                          type="text"
                          value={rec.badge}
                          onChange={(e) =>
                            handleUpdateRecognition(
                              rec.id,
                              "badge",
                              e.target.value
                            )
                          }
                          placeholder="MÉRITO"
                          className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white uppercase font-bold text-emerald-700 focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Título da Distinção
                        </label>
                        <input
                          type="text"
                          value={rec.title}
                          onChange={(e) =>
                            handleUpdateRecognition(
                              rec.id,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Diploma de Reconhecimento — Distinção de Mérito"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Instituição Emissora / Local / Ano
                        </label>
                        <input
                          type="text"
                          value={rec.issuerLocation}
                          onChange={(e) =>
                            handleUpdateRecognition(
                              rec.id,
                              "issuerLocation",
                              e.target.value
                            )
                          }
                          placeholder="Centro de Operações de Segurança Aeroportuária (COSA) | Ícolo e Bengo | 2026"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveRecognition(rec.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Idiomas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">Idiomas</h2>
                  <p className="text-xs text-slate-500">
                    Línguas e nível de proficiência.
                  </p>
                </div>
                <button
                  onClick={handleAddLanguage}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#162D4A] text-white rounded-lg transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Idioma</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2"
                  >
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) =>
                        handleUpdateLanguage(
                          lang.id,
                          "language",
                          e.target.value
                        )
                      }
                      placeholder="Idioma (ex: Francês)"
                      className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                    />
                    <input
                      type="text"
                      value={lang.level}
                      onChange={(e) =>
                        handleUpdateLanguage(lang.id, "level", e.target.value)
                      }
                      placeholder="Nível (ex: Básico)"
                      className="w-28 px-2 py-1 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                    />
                    <button
                      onClick={() => handleRemoveLanguage(lang.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Importação de CV Antigo */}
      {showImportModal && (
        <CVImportModal
          onClose={() => setShowImportModal(false)}
          onImport={(importedData) => {
            onChange(importedData);
            setShowImportModal(false);
          }}
        />
      )}
    </div>
  );
};

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
        active
          ? "border-[#1E3A5F] text-[#1E3A5F] bg-slate-50/70"
          : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/40"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

