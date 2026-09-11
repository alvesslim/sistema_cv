import React from "react";
import { CVData } from "../types";

interface CVDocumentProps {
  data: CVData;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {
  const {
    personalInfo,
    profile,
    technicalSkills,
    behavioralSkills,
    experiences,
    education,
    courses,
    recognitions,
    languages,
  } = data;

  const halfLength = Math.ceil(behavioralSkills.length / 2);
  const col1Skills = behavioralSkills.slice(0, halfLength);
  const col2Skills = behavioralSkills.slice(halfLength);
  const rowCount = Math.max(col1Skills.length, col2Skills.length);

  const font = "Calibri, Carlito, Candara, 'Segoe UI', Arial, sans-serif";

  const pageStyle: React.CSSProperties = {
    fontFamily: font,
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full print:gap-0 print:m-0">
      <div id="cv-content" className="cv-sheet bg-white text-slate-900 shadow-xl relative" style={pageStyle}>
        
        {/* The table structure forces repeating top/bottom spaces ONLY during print */}
        <table className="w-full border-collapse">
          {/* Spacer for Top Margin on print */}
          <thead className="hidden print:table-header-group">
            <tr><td><div style={{ height: "16mm" }}></div></td></tr>
          </thead>
          
          <tbody>
            <tr>
              <td className="p-0 align-top">
                <div className="mb-4">
                  <h1
                    className="font-bold text-[#1A1A1A] tracking-tight mb-1 uppercase"
                    style={{ fontSize: "26pt", lineHeight: "1.15", fontFamily: "Calibri, Carlito, Candara, sans-serif" }}
                  >
                    {personalInfo.fullName || "SEU NOME COMPLETO"}
                  </h1>
                  {personalInfo.title && (
                    <p className="font-bold tracking-wide mb-1.5" style={{ fontSize: "11pt", lineHeight: "1.3", color: "#1E3A5F" }}>
                      {personalInfo.title}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 text-[#555555]" style={{ fontSize: "8.5pt" }}>
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.location && personalInfo.phone && <span className="text-slate-300">•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.phone && personalInfo.email && <span className="text-slate-300">•</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                  </div>
                </div>

                {profile && (
                  <section className="mb-4">
                    <SectionHeader title="PERFIL PROFISSIONAL" />
                    <p className="text-[#333333] text-justify leading-relaxed" style={{ fontSize: "9.5pt" }}>
                      {profile}
                    </p>
                  </section>
                )}

                {technicalSkills.length > 0 && (
                  <section className="mb-4">
                    <SectionHeader title="COMPETÊNCIAS TÉCNICAS" />
                    <div className="space-y-1.5">
                      {technicalSkills.map((cat) => (
                        <SkillRow key={cat.id} category={cat.category} skills={cat.skills} />
                      ))}
                    </div>
                  </section>
                )}

                {behavioralSkills.length > 0 && (
                  <section className="mb-4">
                    <SectionHeader title="COMPETÊNCIAS COMPORTAMENTAIS" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {Array.from({ length: rowCount }).map((_, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex items-center gap-1.5 text-[#1A1A1A]" style={{ fontSize: "9.5pt" }}>
                            {col1Skills[idx] ? (
                              <>
                                <span className="text-slate-500 font-bold shrink-0">—</span>
                                <span>{col1Skills[idx]}</span>
                              </>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-1.5 text-[#1A1A1A]" style={{ fontSize: "9.5pt" }}>
                            {col2Skills[idx] ? (
                              <>
                                <span className="text-slate-500 font-bold shrink-0">—</span>
                                <span>{col2Skills[idx]}</span>
                              </>
                            ) : null}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </section>
                )}

                {experiences.length > 0 && (
                  <section className="mb-4">
                    <SectionHeader title="EXPERIÊNCIA PROFISSIONAL" />
                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h3 className="font-bold text-[#1A1A1A]" style={{ fontSize: "10.5pt" }}>{exp.role}</h3>
                            <span className="text-[#64748B] font-medium" style={{ fontSize: "9pt" }}>{exp.period}</span>
                          </div>
                          <p className="text-[#555555] mb-1 font-medium" style={{ fontSize: "9pt" }}>
                            {[exp.company, exp.location].filter(Boolean).join(" | ")}
                          </p>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="space-y-1">
                              {exp.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2 text-[#1A1A1A]" style={{ fontSize: "9.5pt", lineHeight: "1.5" }}>
                                  <span className="text-slate-500 font-bold shrink-0">—</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.length > 0 && (
                  <section className="mb-2">
                    <SectionHeader title="FORMAÇÃO ACADÊMICA" />
                    <div className="space-y-2">
                      {education.map((edu) => (
                        <div key={edu.id}>
                          <h3 className="font-bold text-[#1A1A1A]" style={{ fontSize: "10pt" }}>{edu.degree}</h3>
                          <p className="text-[#555555]" style={{ fontSize: "9pt" }}>
                            {[edu.institution, edu.location, edu.year].filter(Boolean).join(" | ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {courses.length > 0 && (
                  <section className="mb-5">
                    <SectionHeader title="FORMAÇÃO COMPLEMENTAR & CERTIFICAÇÕES" />
                    <div className="space-y-3">
                      {courses.map((course) => (
                        <div key={course.id}>
                          <h3 className="font-bold text-[#1A1A1A]" style={{ fontSize: "10pt" }}>{course.title}</h3>
                          <p className="text-[#555555]" style={{ fontSize: "9pt" }}>{course.issuerLocation}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {recognitions.length > 0 && (
                  <section className="mb-5">
                    <SectionHeader title="RECONHECIMENTOS & DISTINÇÕES" />
                    <div className="space-y-3">
                      {recognitions.map((rec) => (
                        <div key={rec.id}>
                          <div className="flex items-center gap-2 mb-0.5">
                            {rec.badge && (
                              <span
                                className="inline-flex items-center uppercase font-bold text-[#0F6D48] bg-[#E6F4EA] border border-[#C2E8D3] px-2 py-0.5 rounded"
                                style={{ fontSize: "8pt", letterSpacing: "0.5px" }}
                              >
                                {rec.badge}
                              </span>
                            )}
                            <h3 className="font-bold text-[#1A1A1A]" style={{ fontSize: "10pt" }}>{rec.title}</h3>
                          </div>
                          <p className="text-[#555555]" style={{ fontSize: "9pt" }}>{rec.issuerLocation}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {languages.length > 0 && (
                  <section>
                    <SectionHeader title="IDIOMAS" />
                    <p className="text-[#1A1A1A] font-medium" style={{ fontSize: "9.5pt" }}>
                      {languages.map((lang) => lang.language + ": " + lang.level).join("  |  ")}
                    </p>
                  </section>
                )}
              </td>
            </tr>
          </tbody>

          {/* Spacer for Bottom Margin on print */}
          <tfoot className="hidden print:table-footer-group">
            <tr><td><div style={{ height: "16mm" }}></div></td></tr>
          </tfoot>
        </table>

      </div>
    </div>
  );
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2 pb-0.5" style={{ borderBottom: "0.5pt solid #E0E0E0" }}>
      <div style={{ width: "3.5px", height: "13px", backgroundColor: "#1E3A5F", flexShrink: 0 }} />
      <h2 className="uppercase font-bold text-[#1A1A1A]" style={{ fontSize: "10pt", letterSpacing: "0.5px" }}>
        {title}
      </h2>
    </div>
  );
}

function SkillRow({ category, skills }: { category: string; skills: string[] }) {
  return (
    <div className="flex gap-x-2 gap-y-1 items-baseline">
      <span
        className="uppercase shrink-0 font-bold text-[#4B5563]"
        style={{ fontSize: "8pt", minWidth: "155px", letterSpacing: "0.2px" }}
      >
        {category}
      </span>
      <div className="flex flex-wrap gap-1.5 items-center">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="inline-block px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: "#EEF3F8", border: "1px solid #C7D7E9", color: "#1E3A5F", fontSize: "8pt", fontWeight: 500 }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}