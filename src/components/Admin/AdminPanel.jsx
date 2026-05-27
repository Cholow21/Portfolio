import { useState } from "react";

export default function AdminPanel({ isOpen, onClose, portfolioData, onUpdateData, isDarkMode = true, onToggleTheme }) {
  const [formData, setFormData] = useState(portfolioData);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Theme-aware styles
  const bg = isDarkMode ? "#000" : "#f5f5f5";
  const text = isDarkMode ? "#fff" : "#0a0a0a";
  const muted = "#6b7280";
  const border = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const borderHover = isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const inputBg = isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  const inputStyle = {
    width: "100%", padding: "12px 16px", background: inputBg,
    border: `1px solid ${border}`, color: text,
    fontFamily: "monospace", fontSize: "14px", outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "11px", fontFamily: "monospace",
    letterSpacing: "0.1em", textTransform: "uppercase",
    marginBottom: "8px", color: muted,
  };

  const sectionStyle = { borderTop: `1px solid ${border}`, paddingTop: "40px", paddingBottom: "40px" };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image size should be less than 5MB"); return; }
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => { setEditingProject({ ...editingProject, imageUrl: reader.result }); setUploadingImage(false); };
    reader.onerror = () => { alert("Error reading file"); setUploadingImage(false); };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateData(formData);
      alert("Changes saved successfully!");
    } catch {
      alert("Saved locally. Firebase sync may have failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const SectionLabel = ({ index, title }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-px" style={{ background: borderHover }} />
      <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: muted }}>
        {String(index).padStart(2, "0")} — {title}
        <span className="blink text-blue-500 ml-1">_</span>
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 overflow-y-auto z-[100]" style={{ background: bg, color: text }}>
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: isDarkMode ? "rgba(0,0,0,0.9)" : "rgba(245,245,245,0.9)", borderBottom: `1px solid ${border}` }}>
        <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: borderHover }} />
            <div>
              <h1 style={{ fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: text }}>
                Admin Panel<span className="blink text-blue-500 ml-1">_</span>
              </h1>
              <p style={{ fontSize: "11px", fontFamily: "monospace", color: muted, marginTop: "2px" }}>Edit Mode — All changes are live</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button onClick={onToggleTheme} title={isDarkMode ? "Light Mode" : "Dark Mode"}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{ background: isDarkMode ? "#1a1a1a" : "#fff", border: isDarkMode ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)" }}
            >
              <svg className={!isDarkMode ? "bulb-glow" : ""} width="18" height="18" viewBox="0 0 24 24"
                fill={!isDarkMode ? "#facc15" : "none"} stroke={isDarkMode ? "#ffffff" : "#ca8a04"}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21h6" /><path d="M10 17h4" />
                <path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V16H9v-1.8A6.001 6.001 0 0 1 6 9a6 6 0 0 1 6-6z" />
                {!isDarkMode && <line x1="12" y1="9" x2="12" y2="13" stroke="#ca8a04" strokeWidth="2" />}
              </svg>
            </button>

            <button onClick={handleSave} disabled={isSaving}
              className="group relative px-5 py-2 text-xs font-mono tracking-widest uppercase overflow-hidden transition-all duration-300 disabled:opacity-40"
              style={{ border: `1px solid ${borderHover}`, color: text }}
              onMouseEnter={e => { e.currentTarget.style.color = isDarkMode ? "#000" : "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = text; }}
            >
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: text }} />
              <span className="relative">{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>

            <button onClick={onClose}
              className="px-5 py-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
              style={{ border: `1px solid ${border}`, color: muted }}
              onMouseEnter={e => e.currentTarget.style.color = text}
              onMouseLeave={e => e.currentTarget.style.color = muted}
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-20">

        {/* Personal Info */}
        <div style={sectionStyle}>
          <SectionLabel index={1} title="Personal Information" />

          <div className="mb-8">
            <label style={labelStyle}>Profile Images (slideshow)</label>

            {/* Existing images */}
            {(formData.personalInfo?.profileImages?.length > 0) && (
              <div className="flex flex-wrap gap-3 mb-4">
                {formData.personalInfo.profileImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt={`Profile ${idx + 1}`}
                      className="w-16 h-16 rounded-full object-cover"
                      style={{ border: `1px solid ${border}` }} />
                    <button
                      onClick={() => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, profileImages: formData.personalInfo.profileImages.filter((_, i) => i !== idx) } })}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ background: bg, border: `1px solid ${border}`, color: text, cursor: "pointer" }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Add more images */}
            <label className="flex flex-col items-center justify-center w-full h-24 cursor-pointer transition-all duration-200"
              style={{ border: `1px dashed ${border}` }}
              onMouseEnter={e => e.currentTarget.style.borderColor = borderHover}
              onMouseLeave={e => e.currentTarget.style.borderColor = border}
            >
              <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted }}>+ Add profile image(s)</p>
              <p style={{ fontSize: "11px", fontFamily: "monospace", color: muted, marginTop: "4px" }}>PNG, JPG up to 5MB each</p>
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const current = formData.personalInfo?.profileImages || [];
                  let loaded = 0;
                  const newImages = [];
                  files.forEach(file => {
                    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      newImages.push(reader.result);
                      loaded++;
                      if (loaded === files.length) {
                        setFormData({ ...formData, personalInfo: { ...formData.personalInfo, profileImages: [...current, ...newImages] } });
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[["Full Name", "name"], ["Title / Role", "title"], ["Birthday", "birthday"], ["Age", "age"]].map(([lbl, key]) => (
              <div key={key}>
                <label style={labelStyle}>{lbl}</label>
                <input type="text" value={formData.personalInfo?.[key] || ""}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, [key]: e.target.value } })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = borderHover}
                  onBlur={e => e.target.style.borderColor = border}
                />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={sectionStyle}>
          <SectionLabel index={2} title="About Me" />
          <div className="space-y-4">
            {["paragraph1", "paragraph2", "paragraph3"].map((key, i) => (
              <div key={key}>
                <label style={labelStyle}>Paragraph {i + 1}</label>
                <textarea value={formData.about[key]}
                  onChange={(e) => setFormData({ ...formData, about: { ...formData.about, [key]: e.target.value } })}
                  style={{ ...inputStyle, resize: "vertical" }} rows="3"
                  onFocus={e => e.target.style.borderColor = borderHover}
                  onBlur={e => e.target.style.borderColor = border}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={sectionStyle}>
          <SectionLabel index={3} title="Skills & Technologies" />
          {Object.entries(formData.skills).map(([category, skills]) => (
            <div key={category} className="mb-8 pb-8" style={{ borderBottom: `1px solid ${border}` }}>
              <div className="flex justify-between items-center mb-4">
                <p style={{ fontFamily: "monospace", fontWeight: "bold", color: text }}>{category}</p>
                <button onClick={() => { const s = prompt(`Add skill to ${category}:`); if (s) setFormData({ ...formData, skills: { ...formData.skills, [category]: [...formData.skills[category], s] } }); }}
                  style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = text}
                  onMouseLeave={e => e.currentTarget.style.color = muted}
                >+ Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ border: `1px solid ${border}`, fontSize: "12px", fontFamily: "monospace", color: text }}>
                    <span>{skill}</span>
                    <button onClick={() => setFormData({ ...formData, skills: { ...formData.skills, [category]: skills.filter((_, i) => i !== idx) } })}
                      style={{ color: muted, cursor: "pointer", fontWeight: "bold" }}
                      onMouseEnter={e => e.currentTarget.style.color = text}
                      onMouseLeave={e => e.currentTarget.style.color = muted}
                    >×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div style={sectionStyle}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: borderHover }} />
              <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: muted }}>
                04 — Projects<span className="blink text-blue-500 ml-1">_</span>
              </span>
            </div>
            <button onClick={() => setEditingProject({ id: Date.now(), name: "", description: "", type: "" })}
              style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = text}
              onMouseLeave={e => e.currentTarget.style.color = muted}
            >+ Add Project</button>
          </div>

          {editingProject && (
            <div className="mb-8 p-6" style={{ border: `1px solid ${border}`, background: inputBg }}>
              <p style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: "24px" }}>
                {editingProject.name ? "Edit Project" : "New Project"}
              </p>
              <div className="space-y-4">
                {[["Project Name", "name"], ["Project Type", "type"]].map(([lbl, key]) => (
                  <div key={key}>
                    <label style={labelStyle}>{lbl}</label>
                    <input type="text" value={editingProject[key]}
                      onChange={(e) => setEditingProject({ ...editingProject, [key]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = borderHover}
                      onBlur={e => e.target.style.borderColor = border}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }} rows="3"
                    onFocus={e => e.target.style.borderColor = borderHover}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Project Image</label>
                  {editingProject.imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-40 overflow-hidden" style={{ border: `1px solid ${border}` }}>
                        <img src={editingProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setEditingProject({ ...editingProject, imageUrl: null })}
                          className="absolute top-2 right-2 px-3 py-1"
                          style={{ fontSize: "12px", fontFamily: "monospace", background: bg, color: text, border: `1px solid ${border}`, cursor: "pointer" }}
                        >Remove</button>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload}
                        style={{ fontSize: "12px", fontFamily: "monospace", color: muted }} />
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                      style={{ border: `1px dashed ${border}` }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = borderHover}
                      onMouseLeave={e => e.currentTarget.style.borderColor = border}
                    >
                      <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted }}>Click to upload image</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                    </label>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (!editingProject.name || !editingProject.description || !editingProject.type) { alert("Fill in all required fields"); return; }
                      const idx = formData.projects.findIndex(p => p.id === editingProject.id);
                      const updated = idx >= 0 ? formData.projects.map((p, i) => i === idx ? editingProject : p) : [...formData.projects, editingProject];
                      setFormData({ ...formData, projects: updated });
                      setEditingProject(null);
                    }}
                    className="group relative flex-1 py-2 text-xs font-mono tracking-widest uppercase overflow-hidden transition-all duration-300"
                    style={{ border: `1px solid ${borderHover}`, color: text }}
                    onMouseEnter={e => { e.currentTarget.style.color = isDarkMode ? "#000" : "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = text; }}
                  >
                    <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: text }} />
                    <span className="relative">Save Project</span>
                  </button>
                  <button onClick={() => setEditingProject(null)}
                    className="px-6 py-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
                    style={{ border: `1px solid ${border}`, color: muted }}
                    onMouseEnter={e => e.currentTarget.style.color = text}
                    onMouseLeave={e => e.currentTarget.style.color = muted}
                  >Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div>
            {formData.projects.map((project, idx) => (
              <div key={project.id} className="grid grid-cols-4 gap-4 py-5"
                style={{ borderTop: `1px solid ${border}` }}>
                <div><span style={{ fontSize: "12px", fontFamily: "monospace", color: muted }}>{String(idx + 1).padStart(2, "0")}</span></div>
                <div className="col-span-2">
                  <p style={{ fontWeight: "bold", color: text, fontSize: "14px" }}>{project.name}</p>
                  <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted, marginTop: "4px" }}>{project.type}</p>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <button onClick={() => setEditingProject(project)}
                    style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = text}
                    onMouseLeave={e => e.currentTarget.style.color = muted}
                  >Edit</button>
                  <button onClick={() => { if (confirm("Delete this project?")) setFormData({ ...formData, projects: formData.projects.filter(p => p.id !== project.id) }); }}
                    style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = text}
                    onMouseLeave={e => e.currentTarget.style.color = muted}
                  >Delete</button>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${border}` }} />
          </div>
        </div>

        {/* Certifications */}
        <div style={sectionStyle}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: borderHover }} />
              <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: muted }}>
                05 — Certifications<span className="blink text-blue-500 ml-1">_</span>
              </span>
            </div>
            <button onClick={() => {
              const title = prompt("Certification title:"); if (!title) return;
              const subtitle = prompt("Subtitle:"); const issuer = prompt("Issued by:");
              if (subtitle && issuer) setFormData({ ...formData, certifications: [...(formData.certifications || []), { id: Date.now(), title, subtitle, issuer }] });
            }}
              style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = text}
              onMouseLeave={e => e.currentTarget.style.color = muted}
            >+ Add</button>
          </div>

          <div>
            {(formData.certifications?.length > 0) ? formData.certifications.map((cert, idx) => (
              <div key={cert.id} className="grid grid-cols-4 gap-4 py-5"
                style={{ borderTop: `1px solid ${border}` }}>
                <div><span style={{ fontSize: "12px", fontFamily: "monospace", color: muted }}>{String(idx + 1).padStart(2, "0")}</span></div>
                <div className="col-span-2">
                  <p style={{ fontWeight: "bold", color: text, fontSize: "14px" }}>{cert.title}</p>
                  <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted, marginTop: "4px" }}>{cert.subtitle}</p>
                  <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted }}>{cert.issuer}</p>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <button onClick={() => {
                    const title = prompt("Edit title:", cert.title); if (title === null) return;
                    const subtitle = prompt("Edit subtitle:", cert.subtitle); if (subtitle === null) return;
                    const issuer = prompt("Edit issuer:", cert.issuer); if (issuer === null) return;
                    setFormData({ ...formData, certifications: formData.certifications.map(c => c.id === cert.id ? { ...c, title: title || c.title, subtitle: subtitle || c.subtitle, issuer: issuer || c.issuer } : c) });
                  }}
                    style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = text}
                    onMouseLeave={e => e.currentTarget.style.color = muted}
                  >Edit</button>
                  <button onClick={() => { if (confirm("Delete?")) setFormData({ ...formData, certifications: formData.certifications.filter(c => c.id !== cert.id) }); }}
                    style={{ fontSize: "12px", fontFamily: "monospace", color: muted, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = text}
                    onMouseLeave={e => e.currentTarget.style.color = muted}
                  >Delete</button>
                </div>
              </div>
            )) : (
              <p style={{ fontSize: "12px", fontFamily: "monospace", color: muted, padding: "24px 0" }}>No certifications yet.</p>
            )}
            <div style={{ borderTop: `1px solid ${border}` }} />
          </div>
        </div>

        {/* Contact */}
        <div style={sectionStyle}>
          <SectionLabel index={6} title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[["Email", "email"], ["Phone", "phone"], ["Instagram", "instagram"], ["Facebook", "facebook"], ["Address", "address"]].map(([lbl, key]) => (
              <div key={key} className={key === "address" ? "md:col-span-2" : ""}>
                <label style={labelStyle}>{lbl}</label>
                <input type="text" value={formData.contact[key] || ""}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, [key]: e.target.value } })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = borderHover}
                  onBlur={e => e.target.style.borderColor = border}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
