export default function App() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-8">
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="no-print"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          backgroundColor: '#1E3A5F',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '12px',
          padding: '14px 28px',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 14px rgba(30, 58, 95, 0.4)',
          transition: 'all 0.2s ease',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#162D4A';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 95, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1E3A5F';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 58, 95, 0.4)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Baixar CV
      </button>

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
              fontSize: '24pt',
              color: '#1A1A1A',
              lineHeight: '1.2'
            }}
          >
            ELISA VAFUNDA RAMOS MIGUEL
          </h1>
          <p
            className="mb-3"
            style={{
              fontSize: '10.5pt',
              color: '#1E3A5F',
              fontWeight: '500'
            }}
          >
            Advogada Estagiária | Direito Jurídico-Económico | Assessoria Jurídica
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
            <span>(+244) 946-709-947</span>
            <span>|</span>
            <span>elizraamos26@gmail.com</span>
          </div>
        </header>

        {/* SECTION: PERFIL PROFISSIONAL */}
        <section className="mb-5">
          <SectionHeader title="PERFIL PROFISSIONAL" />
          <p style={{ fontSize: '9.5pt', color: '#1A1A1A', lineHeight: '1.55' }}>
            Advogada estagiária com licenciatura em Direito — Especialização em Jurídico-Económico pela Universidade Católica de Angola. Experiência em assessoria jurídica, elaboração de relatórios, atendimento ao cliente e pesquisa jurídica em sociedade de advogados. Perfil proactivo, organizado e comprometido com a excelência jurídica e o desenvolvimento profissional contínuo na área do Direito Empresarial e Contencioso.
          </p>
        </section>

        {/* SECTION: COMPETÊNCIAS TÉCNICAS */}
        <section className="mb-5">
          <SectionHeader title="COMPETÊNCIAS TÉCNICAS" />

          <div className="space-y-2">
            <SkillCategory
              label="Área Jurídica"
              skills={["Direito Empresarial", "Direito do Trabalho", "Direito Económico", "Contencioso", "Contratos", "Elaboração de Pareceres", "Pesquisa Jurídica", "Assessoria Jurídica", "Direitos Humanos"]}
            />
            <SkillCategory
              label="Ferramentas"
              skills={["Microsoft Word (Avançado)", "Microsoft Excel", "Pesquisa em Bases de Dados Jurídicas"]}
            />
            <SkillCategory
              label="Competências"
              skills={["Elaboração de Relatórios", "Atendimento ao Cliente", "Redação Jurídica"]}
            />
          </div>
        </section>

        {/* SECTION: COMPETÊNCIAS COMPORTAMENTAIS */}
        <section className="mb-5">
          <SectionHeader title="COMPETÊNCIAS COMPORTAMENTAIS" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4px 32px',
            }}
          >
            {[
              "Organização e gestão do tempo",
              "Trabalho em equipe",
              "Proactividade",
              "Responsabilidade",
              "Adaptabilidade",
              "Relacionamento interpessoal",
              "Comprometimento",
              "Facilidade de aprendizado",
            ].map((skill, i) => (
              <span key={i} style={{ fontSize: '9pt', color: '#1A1A1A', lineHeight: '1.6' }}>
                — {skill}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION: EXPERIÊNCIA PROFISSIONAL */}
        <section className="mb-5">
          <SectionHeader title="EXPERIÊNCIA PROFISSIONAL" />

          <div className="space-y-4">
            <ExperienceEntry
              title="Advogada Estagiária"
              company="IEM — Sociedade de Advogados e Associados RL"
              location="Luanda"
              period="2023 – Atual"
              bullets={[
                "Presto assessoria jurídica em processos de direito empresarial e contencioso, com análise e interpretação de legislação",
                "Elaboro relatórios jurídicos, pareceres e documentos legais com rigor técnico e dentro dos prazos estabelecidos",
                "Realizo pesquisa jurídica e acompanhamento de processos judiciais e extrajudiciais",
                "Efectuo atendimento a clientes, recolhendo informações necessárias para instrução dos processos",
              ]}
            />
          </div>
        </section>

        {/* SECTION: FORMAÇÃO ACADÊMICA */}
        <section className="mb-5">
          <SectionHeader title="FORMAÇÃO ACADÊMICA" />

          <div className="space-y-3">
            <EducationEntry
              degree="Licenciatura em Direito — Especialização em Jurídico-Económico"
              institution="Universidade Católica de Angola"
              location="Luanda"
              year="2016 – 2022"
            />
            <EducationEntry
              degree="Ensino Secundário — Ciências Económicas e Jurídicas"
              institution="Colégio Bankazi"
              location="Luanda"
              year="2013 – 2015"
            />
          </div>
        </section>

        {/* SECTION: FORMAÇÃO COMPLEMENTAR */}
        <section className="mb-5">
          <SectionHeader title="FORMAÇÃO COMPLEMENTAR" />

          <div className="space-y-2">
            <div>
              <p style={{ fontSize: '9.5pt', color: '#1A1A1A', fontWeight: '600' }}>
                Curso de Direitos Humanos — Perspectiva Prático Forense
              </p>
              <p style={{ fontSize: '9pt', color: '#555555' }}>
                2023
              </p>
            </div>
            <div>
              <p style={{ fontSize: '9.5pt', color: '#1A1A1A', fontWeight: '600' }}>
                Curso de Informática na Óptica do Utilizador (Word e Excel)
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: TRABALHO VOLUNTÁRIO */}
        <section className="mb-5">
          <SectionHeader title="TRABALHO VOLUNTÁRIO" />

          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <p style={{ fontSize: '10.5pt', fontWeight: '600', color: '#1A1A1A' }}>
                  Membro do Voluntariado — VUCAN
                </p>
                <p style={{ fontSize: '9pt', color: '#555555' }}>
                  Universidade Católica de Angola | Luanda
                </p>
              </div>
              <span style={{ fontSize: '9pt', color: '#555555' }}>
                2016 – 2017
              </span>
            </div>
            <ul className="space-y-1">
              <li
                className="flex gap-2"
                style={{ fontSize: '9.5pt', color: '#1A1A1A', lineHeight: '1.4' }}
              >
                <span className="shrink-0">—</span>
                <span>Participei em actividades de voluntariado universitário, contribuindo para iniciativas de responsabilidade social</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FOOTER ROW: IDIOMAS */}
        <section className="pt-3" style={{ borderTop: '1pt solid #1E3A5F' }}>
          <div className="mb-1 flex items-center gap-2">
            <div style={{ width: '3pt', height: '10pt', backgroundColor: '#1E3A5F' }}></div>
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
            Português: Nativo  |  Inglês: Básico
          </p>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2 pb-1 flex items-center gap-2" style={{ borderBottom: '0.5pt solid #E0E0E0' }}>
      <div style={{ width: '3pt', height: '12pt', backgroundColor: '#1E3A5F' }}></div>
      <h2
        className="uppercase font-bold"
        style={{
          fontSize: '10pt',
          color: '#1A1A1A',
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </h2>
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
              backgroundColor: '#EEF2FF',
              color: '#1E3A5F',
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
