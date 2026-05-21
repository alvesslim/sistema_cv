export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-8">
      {/* A4 Resume Container */}
      <div
        className="bg-white shadow-lg"
        style={{
          width: '210mm',
          minHeight: '297mm',
          fontFamily: 'Inter, sans-serif',
          padding: '18mm 20mm',
        }}
      >
        {/* HEADER BLOCK */}
        <header className="mb-6">
          <h1
            className="font-bold mb-1"
            style={{
              fontSize: '26pt',
              color: '#1A1A1A',
              lineHeight: '1.2'
            }}
          >
            ORLANDO JOSÉ CORREIA
          </h1>
          <p
            className="mb-3"
            style={{
              fontSize: '11pt',
              color: '#2563EB',
              fontWeight: '400'
            }}
          >
            Desenvolvedor de Software Júnior | Web Developer
          </p>
          <div
            className="flex flex-wrap gap-x-3 gap-y-1"
            style={{
              fontSize: '8.5pt',
              color: '#555555'
            }}
          >
            <span>Luanda, Angola</span>
            <span>|</span>
            <span>(+244) 946-554-601</span>
            <span>|</span>
            <span>orlandojosecorreia1@gmail.com</span>
            <span>|</span>
            <span>linkedin.com/in/orlandojoseorreia</span>
            <span>|</span>
            <span>github.com/orlandojosecorreia1-ui</span>
          </div>
        </header>

        {/* SECTION: PERFIL PROFISSIONAL */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              PERFIL PROFISSIONAL
            </h2>
          </div>
          <p style={{ fontSize: '9.5pt', color: '#1A1A1A', lineHeight: '1.5' }}>
            Profissional de TI com experiência prática em desenvolvimento de software, suporte técnico, administração de redes, design gráfico e marketing digital. Formado em Técnico de Informática e cursando Engenharia Informática na Universidade Gregório Semedo (UGS). Perfil versátil com capacidade de atuar em diversas áreas do setor de TI, desde infraestrutura e suporte até desenvolvimento de sistemas e soluções digitais. Comprometido com aprendizado contínuo e entrega de resultados com qualidade e responsabilidade.
          </p>
        </section>

        {/* SECTION: COMPETÊNCIAS TÉCNICAS */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              COMPETÊNCIAS TÉCNICAS
            </h2>
          </div>

          <div className="space-y-2">
            <SkillCategory
              label="Linguagens"
              skills={["C#", "Java", "HTML", "CSS", "JavaScript", "PHP"]}
            />
            <SkillCategory
              label="Banco de Dados"
              skills={["MySQL"]}
            />
            <SkillCategory
              label="CMS & Web"
              skills={["WordPress", "Web Development"]}
            />
            <SkillCategory
              label="Design & UI/UX"
              skills={["Figma", "CorelDRAW", "Photoshop", "Canva"]}
            />
            <SkillCategory
              label="Redes"
              skills={["TCP/IP", "DNS", "DHCP", "LAN", "Switches", "VirtualBox"]}
            />
            <SkillCategory
              label="SO & Hardware"
              skills={["Windows", "Manutenção de Hardware", "IT Support"]}
            />
            <SkillCategory
              label="Ferramentas"
              skills={["Microsoft Office (Avançado)", "Git (básico)"]}
            />
            <SkillCategory
              label="Marketing Digital"
              skills={["Social Media Management", "Gestão de Tráfego Pago", "Content Creation"]}
            />
            <SkillCategory
              label="Inteligência Artificial"
              skills={["ChatGPT", "Claude", "Ferramentas de IA para resolução de problemas"]}
            />
          </div>
        </section>

        {/* SECTION: COMPETÊNCIAS COMPORTAMENTAIS */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              COMPETÊNCIAS COMPORTAMENTAIS
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              "Resolução de problemas",
              "Trabalho em equipe",
              "Aprendizado contínuo",
              "Proatividade",
              "Comunicação eficaz",
              "Organização e gestão do tempo",
              "Criatividade",
              "Responsabilidade e compromisso"
            ].map((skill, i) => (
              <span key={i} style={{ fontSize: '9.5pt', color: '#1A1A1A' }}>
                • {skill}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION: EXPERIÊNCIA PROFISSIONAL */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              EXPERIÊNCIA PROFISSIONAL
            </h2>
          </div>

          <div className="space-y-4">
            <ExperienceEntry
              title="Estagiário — Desenvolvimento de Software"
              company="RamosSoft"
              location="Luanda, Angola"
              period="Mar 2025 – Mai 2025 (3 meses)"
              bullets={[
                "Desenvolvi sistema desktop em Java para gestão de clínica dentária, cobrindo cadastro de pacientes e agendamentos",
                "Criei aplicações web com WordPress, incluindo e-commerce e blog, aplicando boas práticas de estrutura e SEO básico",
                "Participei de formações complementares em redes de computadores, design gráfico e inglês técnico para TI"
              ]}
            />

            <ExperienceEntry
              title="Estagiário — Desenvolvimento de Software"
              company="Xinda Soft"
              location="Luanda, Angola"
              period="Out 2024 – Nov 2024 (2 meses)"
              bullets={[
                "Desenvolvi sistemas desktop e web para gestão interna utilizando C#",
                "Executei testes de software, identifiquei e corrigi bugs, garantindo qualidade e estabilidade das aplicações",
                "Colaborei com equipe de desenvolvimento em projetos reais de backend e frontend"
              ]}
            />

            <ExperienceEntry
              title="Gestor de Marketing Digital & Design — Freelancer"
              company="Autônomo"
              location="Luanda, Angola"
              period="2021 – 2025 (4 anos)"
              bullets={[
                "Criei materiais visuais (posts, banners, folhetos e apresentações) usando Canva, CorelDRAW e Photoshop",
                "Gerenciei estratégia de conteúdo para redes sociais com foco em engajamento orgânico e identidade visual",
                "Planeei e executei campanhas de tráfego pago com foco em conversão e crescimento de audiência",
                "Desenvolvi calendários de publicação e analisei métricas de desempenho de campanhas digitais"
              ]}
            />
          </div>
        </section>

        {/* SECTION: FORMAÇÃO ACADÊMICA */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              FORMAÇÃO ACADÊMICA
            </h2>
          </div>

          <div className="space-y-3">
            <EducationEntry
              degree="Engenharia Informática — Em Curso"
              institution="Universidade Gregório Semedo (UGS)"
              location="Luanda"
              year="2025 – Atual"
            />
            <EducationEntry
              degree="Técnico de Informática — 2º Ciclo do Ensino Secundário"
              institution="Complexo Escolar Tia Lucinda Mário"
              location="Luanda"
              year="2024/2025"
            />
          </div>
        </section>

        {/* SECTION: FORMAÇÃO COMPLEMENTAR */}
        <section className="mb-5">
          <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
            <div style={{ width: '3pt', height: '12pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '10pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              FORMAÇÃO COMPLEMENTAR
            </h2>
          </div>

          <div>
            <p style={{ fontSize: '9.5pt', color: '#1A1A1A', fontWeight: '600' }}>
              Electricidade — Formação Técnica Profissional
            </p>
            <p style={{ fontSize: '9pt', color: '#555555' }}>
              CAAJOFP-LDA | Luanda | Mai 2021
            </p>
          </div>
        </section>

        {/* FOOTER ROW: IDIOMAS */}
        <section className="pt-3" style={{ borderTop: '1pt solid #2563EB' }}>
          <div className="mb-1 flex items-center gap-2">
            <div style={{ width: '3pt', height: '10pt', backgroundColor: '#2563EB' }}></div>
            <h2
              className="uppercase font-bold"
              style={{
                fontSize: '9pt',
                color: '#1A1A1A',
                letterSpacing: '0.5px'
              }}
            >
              IDIOMAS
            </h2>
          </div>
          <p style={{ fontSize: '9pt', color: '#1A1A1A' }}>
            Português: Nativo  |  Inglês: Básico (A2) — em desenvolvimento
          </p>
        </section>
      </div>
    </div>
  );
}

function SkillCategory({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div className="flex gap-2 items-start">
      <span
        className="uppercase shrink-0"
        style={{
          fontSize: '8pt',
          color: '#555555',
          minWidth: '130px',
          fontWeight: '600'
        }}
      >
        {label}:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="inline-block px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              fontSize: '8pt',
              fontWeight: '500'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceEntry({
  title,
  company,
  location,
  period,
  bullets
}: {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[]
}) {
  return (
    <div>
      <div className="flex justify-between items-start mb-1">
        <div>
          <p style={{ fontSize: '10.5pt', fontWeight: '600', color: '#1A1A1A' }}>
            {title}
          </p>
          <p style={{ fontSize: '9pt', color: '#555555' }}>
            {company} | {location}
          </p>
        </div>
        <span style={{ fontSize: '9pt', color: '#555555' }}>
          {period}
        </span>
      </div>
      <ul className="space-y-1">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-2"
            style={{ fontSize: '9.5pt', color: '#1A1A1A', lineHeight: '1.4' }}
          >
            <span className="shrink-0">—</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationEntry({
  degree,
  institution,
  location,
  year
}: {
  degree: string;
  institution: string;
  location: string;
  year: string
}) {
  return (
    <div>
      <p style={{ fontSize: '10pt', fontWeight: '600', color: '#1A1A1A' }}>
        {degree}
      </p>
      <p style={{ fontSize: '9pt', color: '#555555' }}>
        {institution} | {location} | {year}
      </p>
    </div>
  );
}
