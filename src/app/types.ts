export interface PersonalInfo {
  fullName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface CourseCertificationItem {
  id: string;
  title: string;
  issuerLocation: string;
}

export interface RecognitionItem {
  id: string;
  badge: string;
  title: string;
  issuerLocation: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profile: string;
  technicalSkills: SkillCategory[];
  behavioralSkills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  courses: CourseCertificationItem[];
  recognitions: RecognitionItem[];
  languages: LanguageItem[];
}

/**
 * 100% Fictitious sample CV data to protect privacy
 * Completely realistic, professional, and well-rounded
 */
export const sampleCVData: CVData = {
  personalInfo: {
    fullName: "MATEUS FRANCISCO CARDOSO",
    title: "Engenheiro de Redes & Especialista em Segurança da Informação",
    location: "Luanda, Angola",
    phone: "(+244) 923 000 000",
    email: "contacto.profissional@exemplo.ao",
  },
  profile:
    "Engenheiro de Redes e Sistemas com formação superior em Engenharia Informática pela Universidade Católica de Angola. Mais de 6 anos de experiência sólida em administração de infraestruturas de TI, segurança da informação, arquitetura de redes corporativas e gestão de serviços de suporte técnico. Especialista em implementação de protocolos de comunicação, monitoramento de tráfego, gestão de firewalls e continuidade de negócios. Reconhecido pela capacidade analítica, proactividade na resolução de incidentes críticos e liderança de equipas multidisciplinares de TI.",
  technicalSkills: [
    {
      id: "skill-1",
      category: "REDES & INFRAESTRUTURA:",
      skills: [
        "Cisco Packet Tracer",
        "TCP/IP",
        "VPN",
        "DNS",
        "DHCP",
        "Roteamento BGP/OSPF",
        "LAN",
        "WAN",
      ],
    },
    {
      id: "skill-2",
      category: "CIBERSEGURANÇA:",
      skills: [
        "Segurança da Informação",
        "Firewalls Fortinet",
        "Criptografia",
        "ISO 27001",
        "Backup & Disaster Recovery",
        "Vídeovigilância IP (CCTV)",
      ],
    },
    {
      id: "skill-3",
      category: "SISTEMAS & VIRTUALIZAÇÃO:",
      skills: [
        "Windows Server",
        "Linux (Ubuntu/Debian)",
        "VMware vSphere",
        "Active Directory",
      ],
    },
    {
      id: "skill-4",
      category: "FERRAMENTAS:",
      skills: [
        "Wireshark",
        "Zabbix",
        "Microsoft Office 365",
        "Microsoft Excel (Avançado)",
      ],
    },
    {
      id: "skill-5",
      category: "HARDWARE:",
      skills: [
        "Manutenção Preventiva",
        "Diagnóstico de Redes e Servidores",
        "Reparação de Equipamentos",
      ],
    },
    {
      id: "skill-6",
      category: "CLOUD:",
      skills: ["Microsoft Azure", "AWS Cloud Practitioner"],
    },
  ],
  behavioralSkills: [
    "Liderança e gestão de equipas",
    "Ética e sigilo profissional",
    "Resolução analítica de problemas",
    "Atenção minuciosa aos detalhes",
    "Comunicação clara e assertiva",
    "Adaptabilidade sob pressão",
    "Trabalho colaborativo",
    "Determinação e proactividade",
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Administrador de Redes & Infraestrutura de TI",
      company: "Global Tech Solutions",
      location: "Luanda, Angola",
      period: "2021 – Atual",
      bullets: [
        "Planeamento e gestão de infraestrutura de rede corporativa para mais de 500 postos de trabalho, garantindo 99.8% de uptime",
        "Implementação de políticas de cibersegurança, mitigação de ameaças e gestão contínua de firewall corporativo",
        "Coordenação de projetos de virtualização de servidores físicos com VMware, otimizando custos e consumo de recursos",
      ],
    },
    {
      id: "exp-2",
      role: "Técnico de Suporte & Manutenção de Sistemas",
      company: "InforRedes Angola",
      location: "Luanda, Angola",
      period: "2018 – 2021",
      bullets: [
        "Diagnóstico, reparação e configuração de equipamentos de rede, computadores e periféricos em ambientes corporativos",
        "Suporte técnico presencial e remoto a utilizadores, garantindo rápido atendimento com base em métricas de SLA",
        "Execução e auditoria de rotinas de backup diário e testes periódicos de recuperação de desastres (Disaster Recovery)",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Licenciatura em Engenharia Informática",
      institution: "Universidade Católica de Angola (UCAN)",
      location: "Luanda",
      year: "Concluído",
    },
    {
      id: "edu-2",
      degree: "Gestão de Sistemas Informáticos — Ensino Médio",
      institution: "Instituto Médio Politécnico de Luanda (IMPL)",
      location: "Luanda",
      year: "Concluído",
    },
  ],
  courses: [
    {
      id: "course-1",
      title: "Certificação Cisco CCNA — Routing and Switching",
      issuerLocation: "Cisco Networking Academy | 2025",
    },
    {
      id: "course-2",
      title: "Gestão de Cibersegurança e Defesa de Redes",
      issuerLocation: "Centro de Tecnologias de Informação | Luanda | 2024",
    },
    {
      id: "course-3",
      title: "Segurança Operacional e Vídeovigilância IP (CCTV)",
      issuerLocation: "Academia de Segurança Corporativa | Luanda | 2024",
    },
    {
      id: "course-4",
      title: "Administração Avançada de Windows Server e Active Directory",
      issuerLocation: "Formação Profissional TI | Luanda | 2023",
    },
    {
      id: "course-5",
      title: "Fundamentos de ITIL v4 — Gestão de Serviços de TI",
      issuerLocation: "Global IT Certifications | 2022",
    },
    {
      id: "course-6",
      title: "Curso de Língua Inglesa — Nível Avançado",
      issuerLocation: "Instituto de Línguas de Luanda | 2021",
    },
  ],
  recognitions: [
    {
      id: "rec-1",
      badge: "MÉRITO",
      title: "Diploma de Mérito — Profissional Destaque em Infraestrutura e TI",
      issuerLocation:
        "Associação Angolana de Tecnologias e Inovação (AATI) | Luanda | 2025",
    },
  ],
  languages: [
    {
      id: "lang-1",
      language: "Português",
      level: "Nativo",
    },
    {
      id: "lang-2",
      language: "Inglês",
      level: "Avançado (C1)",
    },
    {
      id: "lang-3",
      language: "Espanhol",
      level: "Básico",
    },
  ],
};

export const emptyCVData: CVData = {
  personalInfo: {
    fullName: "",
    title: "",
    location: "",
    phone: "",
    email: "",
  },
  profile: "",
  technicalSkills: [],
  behavioralSkills: [],
  experiences: [],
  education: [],
  courses: [],
  recognitions: [],
  languages: [],
};
