import {
  CVData,
  emptyCVData,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  CourseCertificationItem,
  RecognitionItem,
  LanguageItem,
} from "../types";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js?url";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    pdfjsWorker ||
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

const DEFAULT_BEHAVIORAL_SKILLS = [
  "Liderança e gestão de equipas",
  "Ética e sigilo profissional",
  "Resolução analítica de problemas",
  "Atenção minuciosa aos detalhes",
  "Comunicação clara e assertiva",
  "Adaptabilidade sob pressão",
  "Trabalho colaborativo",
  "Determinação e proactividade",
];

/**
 * Extract raw text from an uploaded file (.pdf, .docx, .txt)
 * with precise newline detection and badge/pill gap detection.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop()?.toLowerCase();

  if (fileExt === "txt") {
    return await file.text();
  }

  if (fileExt === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (fileExt === "pdf") {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
      });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let lastY: number | null = null;
        let lastEndX: number | null = null;
        let pageText = "";

        for (const item of textContent.items as any[]) {
          const str = item.str || "";
          const x = item.transform ? item.transform[4] : 0;
          const y = item.transform ? item.transform[5] : null;
          const width = item.width || 0;

          if (lastY !== null && y !== null && Math.abs(y - lastY) > 4) {
            pageText += "\n";
            lastEndX = null;
          } else if (
            lastY !== null &&
            pageText.length > 0 &&
            !pageText.endsWith(" ") &&
            !pageText.endsWith("\n")
          ) {
            pageText += " ";
            lastEndX = null;
          } else if (lastEndX !== null && x !== null) {
            const gap = x - lastEndX;
            // In PDF layouts, badge gaps are horizontal jumps in standard body text (height < 15)
            const isBadgeGap =
              (item.height || 0) < 15 && (gap > 6 || (str === " " && width > 6));
            if (isBadgeGap) {
              if (
                !pageText.endsWith(", ") &&
                !pageText.endsWith("\n") &&
                !pageText.endsWith(": ") &&
                !pageText.endsWith(":") &&
                !pageText.endsWith("| ")
              ) {
                pageText += ", ";
              }
            } else if (
              gap > 1 &&
              !pageText.endsWith(" ") &&
              !pageText.endsWith("\n") &&
              !pageText.endsWith(", ")
            ) {
              pageText += " ";
            }
          }

          if (str !== " " || width <= 6) {
            pageText += str;
          }

          if (y !== null) lastY = y;
          if (x !== null) lastEndX = x + width;
        }

        fullText += pageText + "\n\n";
      }

      return fullText;
    } catch (e: any) {
      console.error("Error reading PDF:", e);
      throw new Error(
        "Não foi possível extrair o texto deste PDF automaticamente (" +
          (e?.message || "erro de leitura") +
          "). Tente copiar e colar o texto na aba 'Colar Texto'."
      );
    }
  }

  throw new Error(
    "Formato não suportado. Por favor envie um ficheiro PDF, Word (.docx) ou Texto (.txt)."
  );
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Intelligent tokenizer that parses technical & professional skills
 * into individual badge pill tokens, respecting delimiters or detecting
 * compound terms, acronyms and boundaries.
 */
export function tokenizeSkills(input: string): string[] {
  if (!input || !input.trim()) return [];

  // Normalize slashes and spaces in acronyms: 'TCP / IP' -> 'TCP/IP', '( Avançado )' -> '(Avançado)'
  let text = input
    .replace(/\bTCP\s*\/\s*IP\b/gi, "TCP/IP")
    .replace(/\b([A-Z0-9]+)\s*\/\s*([A-Z0-9]+)\b/g, "$1/$2")
    .replace(/\(\s*([a-zA-ZÀ-ú]+)\s*\)/g, "($1)")
    .replace(/\s+/g, " ")
    .trim();

  // If text already has explicit delimiters like comma, semicolon, bullet, pipe, or tab:
  if (/[,;•|—\t]/.test(text)) {
    return text
      .split(/[,;•|—\t]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1);
  }

  const KNOWN_COMPOUND = [
    "Microsoft Excel (Avançado)",
    "Microsoft Excel (Intermédio)",
    "Microsoft Excel (Básico)",
    "Microsoft Excel",
    "Microsoft Office",
    "Microsoft Word",
    "Microsoft PowerPoint",
    "Microsoft Access",
    "Microsoft 365",
    "Power BI",
    "Google Workspace",
    "Cisco Packet Tracer",
    "Segurança da Informação",
    "Segurança Aeroportuária",
    "Coordenação de Segurança Civil",
    "Coordenação de Segurança",
    "Configuração de Redes",
    "Administração de Sistemas",
    "Administração de Redes",
    "Manutenção de Hardware",
    "Manutenção Preventiva/Corretiva",
    "Manutenção Preventiva",
    "Manutenção Corretiva",
    "Diagnóstico e Reparação de Equipamentos",
    "Diagnóstico e Reparação",
    "Instalação e Configuração de SO",
    "Instalação e Configuração",
    "Programação Web",
    "Pesquisa de Conteúdos",
    "Banco de Dados",
    "Bases de Dados",
    "Desenvolvimento Web",
    "Desenvolvimento de Software",
    "Engenharia de Software",
    "Suporte Técnico",
    "Gestão de Redes",
    "Windows Server",
    "Active Directory",
    "Cibersegurança",
    "Contabilidade Geral",
    "Contabilidade Analítica",
    "Gestão Financeira",
    "Auditoria Interna",
    "Fiscalidade Angolana",
    "Declarações Fiscais",
    "Software Primavera",
    "Primavera BSS",
    "Recursos Humanos",
    "Gestão de Pessoas",
    "Recrutamento e Seleção",
    "Processamento Salarial",
    "Legislação Laboral",
    "Atendimento ao Público",
    "Atendimento ao Cliente",
    "Gestão de Reclamações",
    "Técnicas de Vendas",
    "Negociação Comercial",
    "Gestão de Stock",
    "Logística e Distribuição",
    "Gestão de Armazém",
    "Controlo de Inventário",
    "Primeiros Socorros",
    "Enfermagem Geral",
    "Secretariado Executivo",
    "Gestão de Arquivo",
    "Redação Comercial",
    "Windows",
    "Linux",
    "MacOS",
    "SAP",
    "PHC",
  ];

  const ACRONYMS = [
    "TCP/IP",
    "DNS",
    "DHCP",
    "LAN",
    "WAN",
    "VLAN",
    "VPN",
    "VOIP",
    "VoIP",
    "AVSEC",
    "COSA",
    "HTML",
    "CSS",
    "JS",
    "SQL",
    "PHP",
    "ERP",
    "CRM",
    "TI",
    "SI",
    "SO",
    "ITIL",
    "COBIT",
    "AGT",
  ];

  const terms = [...KNOWN_COMPOUND, ...ACRONYMS].sort(
    (a, b) => b.length - a.length
  );

  let working = " " + text + " ";
  const placeholders: { ph: string; term: string }[] = [];

  terms.forEach((term, idx) => {
    const esc = escapeRegex(term);
    const regex = new RegExp("(?:^|(?<=\\s))" + esc + "(?=\\s|$)", "gi");
    if (regex.test(working)) {
      const ph = `__SKILL_${idx}__`;
      working = working.replace(regex, ` ${ph} `);
      placeholders.push({ ph, term });
    }
  });

  const tokens = working.split(/\s+/).filter(Boolean);
  const result: string[] = [];
  let buffer: string[] = [];

  tokens.forEach((tok) => {
    const matchPh = placeholders.find((p) => p.ph === tok);
    if (matchPh) {
      if (buffer.length > 0) {
        result.push(buffer.join(" "));
        buffer = [];
      }
      result.push(matchPh.term);
    } else {
      buffer.push(tok);
    }
  });

  if (buffer.length > 0) {
    result.push(buffer.join(" "));
  }

  return result.filter((s) => s.length > 0);
}

/**
 * Intelligent parser that maps raw text into the exact "Meu CV" standard.
 */
export function parseCVText(rawText: string): CVData {
  const parsed: CVData = JSON.parse(JSON.stringify(emptyCVData));

  // Clean lines while preserving structure
  const rawLines = rawText
    .split(/\r?\n/)
    .map((l) => l.replace(/[\t\r]/g, " ").replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 0);

  if (rawLines.length === 0) return parsed;

  const phoneRegex =
    /(?:\(\+?\d{1,4}\)|\+?\d{1,4})?\s*(?:9\d{2}[-.\s]*\d{3}[-.\s]*\d{3}|222[-.\s]*\d{3}[-.\s]*\d{3}|\d{3}[-.\s]+\d{3}[-.\s]+\d{3})/;

  // 1. EXTRACT EMAIL (cleaning any internal spaces)
  const emailRegex =
    /([a-zA-Z0-9._%+-]+(?:\s*[a-zA-Z0-9._%+-]+)*)\s*@\s*([a-zA-Z0-9.-]+)\s*\.\s*([a-zA-Z]{2,})/i;
  const emailMatch = rawText.match(emailRegex);
  if (emailMatch) {
    parsed.personalInfo.email = emailMatch[0].replace(/\s+/g, "").toLowerCase();
  }

  // 2. EXTRACT PHONE (Angola & International)
  const phoneMatch = rawText.match(phoneRegex);
  if (phoneMatch) {
    parsed.personalInfo.phone = phoneMatch[0].trim();
  }

  // 3. EXTRACT LOCATION
  const locMatch = rawText.match(
    /\b(Luanda|Benguela|Huambo|Lobito|Lubango|Cabinda|Viana|Cazenga|Talatona|Ícolo e Bengo|Kilamba|Soyo|Namibe|Malanje|Uíge)\b(?:\s*,\s*Angola)?/i
  );
  if (locMatch) {
    parsed.personalInfo.location = locMatch[0].includes("Angola")
      ? locMatch[0]
      : `${locMatch[0]}, Angola`;
  } else {
    parsed.personalInfo.location = "Luanda, Angola";
  }

  // 4. EXTRACT FULL NAME
  let nameIndex = -1;
  for (let i = 0; i < Math.min(5, rawLines.length); i++) {
    const line = rawLines[i].replace(/[,;]/g, " ");
    const isHeading =
      /curriculum|curr[ií]culo|vitae|resumo|perfil|dados|pessoal/i.test(line);
    const hasContact = /@|\d{5,}|http/i.test(line);
    const words = line.split(/\s+/).filter((w) => w.length > 0);
    if (
      !isHeading &&
      !hasContact &&
      words.length >= 2 &&
      words.length <= 6 &&
      !line.includes("|")
    ) {
      parsed.personalInfo.fullName = words.join(" ").toUpperCase();
      nameIndex = i;
      break;
    }
  }

  // 5. EXTRACT TITLE / CARGO (Resilient detection for any profession)
  // Check 1: Explicit labels (Cargo: ..., Função: ..., Título: ..., Objetivo: ...)
  for (let i = 0; i < Math.min(10, rawLines.length); i++) {
    const labelMatch = rawLines[i].match(
      /^(?:cargo|fun[çc][aã]o|t[ií]tulo|posi[çc][aã]o|profiss[aã]o|objectivo(?:\s*profissional)?)\s*[:\-–—]\s*(.+)$/i
    );
    if (labelMatch) {
      parsed.personalInfo.title = labelMatch[1].trim();
      break;
    }
  }

  // Check 2: Inspect lines around full name (nameIndex + 1 up to nameIndex + 4)
  if (!parsed.personalInfo.title) {
    const startIdx = nameIndex >= 0 ? nameIndex + 1 : 0;
    const endIdx = Math.min(startIdx + 4, rawLines.length);

    for (let i = startIdx; i < endIdx; i++) {
      const line = rawLines[i].trim();
      if (!line) continue;
      const isContact =
        line.includes("@") ||
        phoneRegex.test(line) ||
        /linkedin|github|http|www\./i.test(line);
      const isPureLoc =
        /^(?:luanda|benguela|huambo|angola|viana|talatona|lobito|lubango)(?:\s*,\s*angola)?$/i.test(
          line
        );
      const isHeading =
        /curriculum|curr[ií]culo|resumo|perfil|compet[eê]ncias|dados|pessoais|experi[eê]ncia/i.test(
          line
        );
      const isName = nameIndex >= 0 && i === nameIndex;

      if (
        !isContact &&
        !isPureLoc &&
        !isHeading &&
        !isName &&
        line.length > 2 &&
        line.length < 120
      ) {
        parsed.personalInfo.title = line
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean)
          .join(" | ");
        break;
      }
    }
  }

  // Check 3: Any pipe-separated line in first 8 lines
  if (!parsed.personalInfo.title) {
    for (let i = 0; i < Math.min(8, rawLines.length); i++) {
      const line = rawLines[i];
      if (
        line !== parsed.personalInfo.fullName &&
        !line.includes("@") &&
        !phoneRegex.test(line) &&
        line.length < 100
      ) {
        parsed.personalInfo.title = line
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean)
          .join(" | ");
        break;
      }
    }
  }

  // 6. DETECT SECTION HEADINGS
  const sectionKeywords: { [key: string]: RegExp } = {
    behavioral:
      /^(?:[•\-\*—]\s*)?(compet[eê]ncias\s*comportamentais|habilidades\s*comportamentais|soft\s*skills|atitudes\s*profissionais)[\s:]*$/i,
    skills:
      /^(?:[•\-\*—]\s*)?(compet[eê]ncias\s*t[eé]cnicas|compet[eê]ncias|habilidades\s*t[eé]cnicas|hard\s*skills|conhecimentos\s*t[eé]cnicos)[\s:]*$/i,
    profile:
      /^(?:[•\-\*—]\s*)?(perfil\s*profissional|resumo\s*profissional|perfil|resumo|sobre\s*mim|s[ií]ntese\s*profissional|apresenta[çc][aã]o)[\s:]*$/i,
    experience:
      /^(?:[•\-\*—]\s*)?(experi[eê]ncia\s*profissional|experi[eê]ncias|hist[oó]rico\s*profissional|percurso\s*profissional|carreira)[\s:]*$/i,
    education:
      /^(?:[•\-\*—]\s*)?(forma[çc][aã]o\s*acad[eê]mica|educa[çc][aã]o|habilita[çc][oõ]es\s*liter[aá]rias|estudos|ensino)[\s:]*$/i,
    courses:
      /^(?:[•\-\*—]\s*)?(forma[çc][aã]o\s*complementar(?:\s*&\s*certifica[çc][oõ]es)?|certifica[çc][oõ]es(?:\s*&\s*cursos)?|cursos(?:\s*complementares)?|certificados)[\s:]*$/i,
    recognitions:
      /^(?:[•\-\*—]\s*)?(reconhecimentos(?:\s*&\s*distin[çc][oõ]es)?|distin[çc][oõ]es(?:\s*&\s*pr[eé]mios)?|pr[eé]mios(?:\s*&\s*reconhecimentos)?|reconhecimento|m[eé]rito)[\s:]*$/i,
    languages: /^(?:[•\-\*—]\s*)?(idiomas|l[ií]nguas)[\s:]*$/i,
  };

  const sections: { name: string; startIndex: number }[] = [];
  rawLines.forEach((line, index) => {
    if (line.length <= 45 && !/^[•\-\*—]/.test(line)) {
      for (const [key, regex] of Object.entries(sectionKeywords)) {
        if (regex.test(line)) {
          sections.push({ name: key, startIndex: index });
          break;
        }
      }
    }
  });

  sections.sort((a, b) => a.startIndex - b.startIndex);

  const getSectionLines = (sectionName: string): string[] => {
    const secIndex = sections.findIndex((s) => s.name === sectionName);
    if (secIndex === -1) return [];
    const start = sections[secIndex].startIndex + 1;
    const end =
      secIndex + 1 < sections.length
        ? sections[secIndex + 1].startIndex
        : rawLines.length;
    return rawLines.slice(start, end);
  };

  // 7. PROFILE
  const profileLines = getSectionLines("profile");
  if (profileLines.length > 0) {
    parsed.profile = profileLines.join(" ");
  }

  // 8. TECHNICAL SKILLS (PRESERVES ICONIC CATEGORIES & INDIVIDUAL BUBBLES)
  const skillLines = getSectionLines("skills");
  if (skillLines.length > 0) {
    const categories: SkillCategory[] = [];
    let currentCat: SkillCategory | null = null;

    skillLines.forEach((line) => {
      const catMatch = line.match(/^([A-ZÀ-Ú0-9\s&/\\-]+)\s*:\s*(.*)$/);
      if (
        catMatch &&
        catMatch[1].trim().length < 35 &&
        !/^(tel|email|fone|site|url|http)/i.test(catMatch[1])
      ) {
        if (currentCat && currentCat.skills.length > 0) {
          categories.push(currentCat);
        }
        const catName = catMatch[1].trim().toUpperCase() + ":";
        const remainder = catMatch[2].trim();
        const skills = remainder ? tokenizeSkills(remainder) : [];
        currentCat = {
          id: `cat-imp-${categories.length + 1}`,
          category: catName,
          skills: skills.length > 0 ? skills : [remainder].filter(Boolean),
        };
      } else if (currentCat) {
        const moreSkills = tokenizeSkills(line);
        if (moreSkills.length > 0) {
          currentCat.skills.push(...moreSkills);
        } else if (line.trim()) {
          currentCat.skills.push(line.trim());
        }
      } else {
        const items = tokenizeSkills(line);
        if (items.length > 0) {
          if (!currentCat) {
            currentCat = {
              id: "cat-imp-1",
              category: "COMPETÊNCIAS PRINCIPAIS:",
              skills: [],
            };
          }
          currentCat.skills.push(...items);
        }
      }
    });

    if (currentCat && currentCat.skills.length > 0) {
      categories.push(currentCat);
    }

    if (categories.length > 0) {
      parsed.technicalSkills = categories;
    }
  }

  // 9. BEHAVIORAL SKILLS (2-COLUMN GRID)
  const behLines = getSectionLines("behavioral");
  if (behLines.length > 0) {
    const behList: string[] = [];
    behLines.forEach((line) => {
      const parts = line
        .split(/[—•\*\;\,]/)
        .map((p) => p.trim())
        .filter((p) => p.length > 2);
      behList.push(...parts);
    });
    if (behList.length > 0) {
      parsed.behavioralSkills = behList.slice(0, 10);
    }
  }
  if (parsed.behavioralSkills.length === 0) {
    parsed.behavioralSkills = DEFAULT_BEHAVIORAL_SKILLS;
  }

  // 10. EXPERIENCES
  const expLines = getSectionLines("experience");
  if (expLines.length > 0) {
    const expItems: ExperienceItem[] = [];
    let currentExp: ExperienceItem | null = null;

    expLines.forEach((line) => {
      const yearMatch = line.match(
        /\b(19\d{2}|20\d{2})\s*(?:–|-|—|a|até)\s*(19\d{2}|20\d{2}|presente|atual)\b/i
      );
      const isBullet = /^[•\-\*—]/.test(line);

      if (isBullet && currentExp) {
        currentExp.bullets.push(line.replace(/^[•\-\*—]\s*/, "").trim());
        currentExp.bullets.push(
          line.replace(/^[•\-\*—]\s*,?\s*/, "").trim()
        );
      } else if (yearMatch) {
        if (currentExp && !currentExp.period) {
          currentExp.period = yearMatch[0].trim();
        } else {
          if (currentExp) expItems.push(currentExp);
          currentExp = {
            id: `exp-imp-${expItems.length + 1}`,
            role:
              line
                .replace(yearMatch[0], "")
                .replace(/[|•-]/g, "")
                .trim() || "Cargo Profissional",
            company: "Empresa",
            location: "Luanda, Angola",
            period: yearMatch[0].trim(),
            bullets: [],
          };
        }
      } else if (!isBullet) {
        if (!currentExp) {
          currentExp = {
            id: `exp-imp-1`,
            role: line.trim(),
            company: "Empresa",
            location: "Luanda, Angola",
            period: "",
            bullets: [],
          };
        } else if (
          currentExp.company === "Empresa" &&
          !currentExp.bullets.length
        ) {
          const parts = line.split("|").map((p) => p.trim());
          currentExp.company = parts[0] || line.trim();
          if (parts[1]) currentExp.location = parts[1];
        } else if (currentExp.bullets.length > 0) {
          expItems.push(currentExp);
          currentExp = {
            id: `exp-imp-${expItems.length + 1}`,
            role: line.trim(),
            company: "Empresa",
            location: "Luanda, Angola",
            period: "",
            bullets: [],
          };
          // Wrapped bullet continuation line vs new experience
          const lastBullet =
            currentExp.bullets[currentExp.bullets.length - 1];
          const isContinuation =
            /^[a-zà-ú0-9]/.test(line.trim()) ||
            !/[.!?]$/.test(lastBullet) ||
            line.trim().length < 35;

          if (isContinuation) {
            currentExp.bullets[currentExp.bullets.length - 1] = (
              lastBullet +
              " " +
              line.trim()
            ).replace(/\s+/g, " ");
          } else {
            expItems.push(currentExp);
            currentExp = {
              id: `exp-imp-${expItems.length + 1}`,
              role: line.trim(),
              company: "Empresa",
              location: "Luanda, Angola",
              period: "",
              bullets: [],
            };
          }
        }
      }
    });

    if (currentExp) expItems.push(currentExp);

    if (expItems.length > 0) {
      parsed.experiences = expItems.map((e) => ({
        ...e,
        period: e.period || "2022 – Atual",
        bullets:
          e.bullets.length > 0
            ? e.bullets
            : ["Desempenho de atividades e responsabilidades da função."],
      }));
    }
  }

  // 11. EDUCATION
  const eduLines = getSectionLines("education");
  if (eduLines.length > 0) {
    const eduItems: EducationItem[] = [];
    let currentEdu: EducationItem | null = null;

    eduLines.forEach((line) => {
      if (line.includes("|")) {
        const parts = line.split("|").map((p) => p.trim());
        if (currentEdu) {
          currentEdu.institution = parts[0] || currentEdu.institution;
          currentEdu.location = parts[1] || currentEdu.location;
          currentEdu.year = parts[2] || currentEdu.year;
        }
      } else {
        if (currentEdu) eduItems.push(currentEdu);
        currentEdu = {
          id: `edu-imp-${eduItems.length + 1}`,
          degree: line.trim(),
          institution: "Instituição de Ensino",
          location: "Luanda",
          year: "Concluído",
        };
        if (currentEdu && currentEdu.institution === "Instituição de Ensino") {
          currentEdu.degree = (
            currentEdu.degree +
            " " +
            line.trim()
          ).replace(/\s+/g, " ");
        } else {
          if (currentEdu) eduItems.push(currentEdu);
          currentEdu = {
            id: `edu-imp-${eduItems.length + 1}`,
            degree: line.trim(),
            institution: "Instituição de Ensino",
            location: "Luanda",
            year: "Concluído",
          };
        }
      }
    });

    if (currentEdu) eduItems.push(currentEdu);

    if (eduItems.length > 0) {
      parsed.education = eduItems;
    }
  }

  // 12. COURSES & CERTIFICATIONS
  const courseLines = getSectionLines("courses");
  if (courseLines.length > 0) {
    const courseItems: CourseCertificationItem[] = [];
    let currentCourse: CourseCertificationItem | null = null;

    courseLines.forEach((line) => {
      const isMeta = line.includes("|") || /^\d{4}$/.test(line.trim());
      if (isMeta && currentCourse) {
        currentCourse.issuerLocation = line.trim();
        courseItems.push(currentCourse);
        currentCourse = null;
      } else {
        if (currentCourse) courseItems.push(currentCourse);
        currentCourse = {
          id: `course-imp-${courseItems.length + 1}`,
          title: line.trim(),
          issuerLocation: "Luanda | Concluído",
        };
        if (
          currentCourse &&
          currentCourse.issuerLocation === "Luanda | Concluído"
        ) {
          currentCourse.title = (
            currentCourse.title +
            " " +
            line.trim()
          ).replace(/\s+/g, " ");
        } else {
          if (currentCourse) courseItems.push(currentCourse);
          currentCourse = {
            id: `course-imp-${courseItems.length + 1}`,
            title: line.trim(),
            issuerLocation: "Luanda | Concluído",
          };
        }
      }
    });

    if (currentCourse) courseItems.push(currentCourse);

    if (courseItems.length > 0) {
      parsed.courses = courseItems;
    }
  }

  // 13. RECOGNITIONS & DISTINÇÕES
  const recLines = getSectionLines("recognitions");
  if (recLines.length > 0) {
    const recs: RecognitionItem[] = [];
    let currentRec: RecognitionItem | null = null;

    recLines.forEach((line) => {
      const isBadge =
        /^(m[eé]rito|honra|destaque|reconhecimento|excel[eê]ncia)\b/i.test(line);
      if (isBadge || !currentRec) {
        if (currentRec) recs.push(currentRec);
        const badgeMatch = line.match(
          /^(m[eé]rito|honra|destaque|reconhecimento|excel[eê]ncia)\b/i
        );
        const badge = badgeMatch ? badgeMatch[0].toUpperCase() : "MÉRITO";
        const cleanTitle = line
          .replace(new RegExp(`^${badge}\\s*`, "i"), "")
          .replace(/^[—•\-\*]\s*/, "")
          .trim();
        currentRec = {
          id: `rec-imp-${recs.length + 1}`,
          badge: badge,
          title:
            cleanTitle || "Diploma de Reconhecimento & Mérito Profissional",
          issuerLocation: "Instituição Emissora | Luanda | 2026",
        };
      } else if (
        currentRec &&
        (line.includes("|") || /^\d{4}$/.test(line.trim()))
      ) {
        currentRec.issuerLocation = line.trim();
      } else if (
        currentRec &&
        currentRec.issuerLocation === "Instituição Emissora | Luanda | 2026"
      ) {
        currentRec.issuerLocation = line.trim();
        currentRec.title = (
          currentRec.title +
          " " +
          line.trim()
        ).replace(/\s+/g, " ");
      }
    });

    if (currentRec) recs.push(currentRec);
    if (recs.length > 0) {
      parsed.recognitions = recs;
    }
  } else if (
    /reconhecimento|m[eé]rito|distin[çc][aã]o|diploma/i.test(parsed.profile)
  ) {
    parsed.recognitions = [
      {
        id: "rec-imp-1",
        badge: "MÉRITO",
        title: "Diploma de Reconhecimento — Distinção de Mérito Profissional",
        issuerLocation:
          "Centro de Operações de Segurança Aeroportuária (COSA) | Luanda | 2026",
      },
    ];
  }

  // 14. LANGUAGES
  const langLines = getSectionLines("languages");
  if (langLines.length > 0) {
    const langs: LanguageItem[] = [];
    langLines.forEach((line) => {
      const parts = line.split(/[|;]/);
      parts.forEach((p) => {
        const sub = p.split(/[:\-–—]/).map((s) => s.trim());
        if (sub[0] && sub[0].length > 2) {
          langs.push({
            id: `lang-imp-${langs.length + 1}`,
            language: sub[0].trim(),
            level: sub[1] ? sub[1].trim() : "Fluente",
          });
        }
      });
    });
    if (langs.length > 0) {
      parsed.languages = langs;
    }
  }
  if (parsed.languages.length === 0) {
    parsed.languages = [
      { id: "lang-def-1", language: "Português", level: "Nativo" },
      { id: "lang-def-2", language: "Inglês", level: "Básico" },
    ];
  }

  return parsed;
}
