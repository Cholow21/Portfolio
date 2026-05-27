import { useState } from "react";

const inputClass = "w-full px-4 py-3 bg-transparent border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white/60 transition-colors duration-200 placeholder-gray-600";
const inputStyle = { background: "rgba(255,255,255,0.03)" };
const labelClass = "block text-xs font-mono tracking-widest uppercase mb-2 text-gray-400";
const sectionBorder = "border-t border-white/10";

function Section({ title, index, children, action }) {
  return (
    <section className={`py-10 ${sectionBorder}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          <h2 className="text-xs font-mono tracking-widest uppercase text-gray-500">
            {String(index).padStart(2, "0")} — {title}
            <span className="blink text-white ml-1">_</span>
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function AdminPanel({ isOpen, onClose, portfolioData, onUpdateData }) {
  const [formData, setFormData] = useState(portfolioData);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  return (
    <div className="fixed inset-0 overflow-y-auto z-[100] bg-black text-white">
      {/* Scanlines */}
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(0,0,0,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex justify-between items-center px-6 sm:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            <div>
              <h1 className="text-sm font-mono tracking-widest uppercase text-white">
                Admin Panel<span className="blink text-white ml-1">_</span>
              </h1>
              <p className="text-xs font-mono text-gray-600 mt-0.5">Edit Mode — All changes are live</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative px-6 py-2 border border-white/40 text-white text-xs font-mono tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-black disabled:opacity-40"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-xs font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-20">

        {/* Personal Info */}
        <Section title="Personal Information" index={1}>
          {/* Profile Image */}
          <div className="mb-8">
            <label className={labelClass}>Profile Image</label>
            {formData.personalInfo?.profileImage ? (
              <div className="flex items-center gap-6">
                <img src={formData.personalInfo.profileImage} alt="Profile"
                  className="w-20 h-20 rounded-full object-cover" style={{ border: "1px solid rgba(255,255,255,0.2)" }} />
                <div className="space-y-2">
                  <input type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, profileImage: reader.result } });
                      reader.readAsDataURL(file);
                    }}
                    className="text-xs font-mono text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:border file:border-white/20 file:bg-transparent file:text-white file:text-xs file:font-mono file:cursor-pointer hover:file:border-white/40 file:transition-all"
                  />
                  <button onClick={() => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, profileImage: null } })}
                    className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-28 cursor-pointer transition-all duration-200"
                style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
              >
                <p className="text-xs font-mono text-gray-600">Click to upload profile image</p>
                <p className="text-xs font-mono text-gray-700 mt-1">PNG, JPG up to 5MB</p>
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, profileImage: reader.result } });
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Full Name", "name", "text", "Marshal Cholo Clemente"],
              ["Title / Role", "title", "text", "BSIT Graduate"],
              ["Birthday", "birthday", "text", "September 21, 2004"],
              ["Age", "age", "text", "21"],
            ].map(([lbl, key, type, placeholder]) => (
              <div key={key}>
                <label className={labelClass}>{lbl}</label>
                <input type={type} value={formData.personalInfo?.[key] || ""} placeholder={placeholder}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, [key]: e.target.value } })}
                  className={inputClass} style={inputStyle}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* About */}
        <Section title="About Me" index={2}>
          <div className="space-y-4">
            {["paragraph1", "paragraph2", "paragraph3"].map((key, i) => (
              <div key={key}>
                <label className={labelClass}>Paragraph {i + 1}</label>
                <textarea value={formData.about[key]}
                  onChange={(e) => setFormData({ ...formData, about: { ...formData.about, [key]: e.target.value } })}
                  className={inputClass} style={inputStyle} rows="3"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills & Technologies" index={3}>
          {Object.entries(formData.skills).map(([category, skills]) => (
            <div key={category} className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold text-white font-mono">{category}</p>
                <button
                  onClick={() => { const s = prompt(`Add skill to ${category}:`); if (s) setFormData({ ...formData, skills: { ...formData.skills, [category]: [...formData.skills[category], s] } }); }}
                  className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200"
                >
                  + Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-gray-300"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                    <span>{skill}</span>
                    <button onClick={() => setFormData({ ...formData, skills: { ...formData.skills, [category]: skills.filter((_, i) => i !== idx) } })}
                      className="text-white hover:text-gray-300 transition-colors duration-200 leading-none">×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects" index={4}
          action={
            <button onClick={() => setEditingProject({ id: Date.now(), name: "", description: "", type: "" })}
              className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">
              + Add Project
            </button>
          }
        >
          {editingProject && (
            <div className="mb-8 p-6" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs font-mono tracking-widest uppercase text-gray-500 mb-6">
                {editingProject.name ? "Edit Project" : "New Project"}
              </p>
              <div className="space-y-4">
                {[["Project Name", "name", "text"], ["Project Type", "type", "text"]].map(([lbl, key, type]) => (
                  <div key={key}>
                    <label className={labelClass}>{lbl}</label>
                    <input type={type} value={editingProject[key]}
                      onChange={(e) => setEditingProject({ ...editingProject, [key]: e.target.value })}
                      className={inputClass} style={inputStyle} placeholder={lbl}
                    />
                  </div>
                ))}
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className={inputClass} style={inputStyle} rows="3" placeholder="Project description"
                  />
                </div>
                <div>
                  <label className={labelClass}>Project Image</label>
                  {editingProject.imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-40 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                        <img src={editingProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setEditingProject({ ...editingProject, imageUrl: null })}
                          className="absolute top-2 right-2 text-xs font-mono px-3 py-1 bg-black/80 text-white hover:text-gray-300 transition-colors"
                          style={{ border: "1px solid rgba(255,0,0,0.3)" }}>
                          Remove
                        </button>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload}
                        className="text-xs font-mono text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:border file:border-white/20 file:bg-transparent file:text-white file:text-xs file:font-mono file:cursor-pointer hover:file:border-white/40 file:transition-all"
                      />
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer transition-all duration-200"
                      style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
                    >
                      <p className="text-xs font-mono text-gray-600">Click to upload image</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                    </label>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (!editingProject.name || !editingProject.description || !editingProject.type) { alert("Fill in all required fields"); return; }
                      const idx = formData.projects.findIndex(p => p.id === editingProject.id);
                      const updated = idx >= 0
                        ? formData.projects.map((p, i) => i === idx ? editingProject : p)
                        : [...formData.projects, editingProject];
                      setFormData({ ...formData, projects: updated });
                      setEditingProject(null);
                    }}
                    className="group relative flex-1 py-2 border border-white/40 text-white text-xs font-mono tracking-widest uppercase overflow-hidden transition-all duration-300 hover:text-black"
                  >
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative">Save Project</span>
                  </button>
                  <button onClick={() => setEditingProject(null)}
                    className="px-6 py-2 text-xs font-mono tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-0">
            {formData.projects.map((project, idx) => (
              <div key={project.id} className="group grid grid-cols-4 gap-4 py-5 transition-all duration-300"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="col-span-1">
                  <span className="text-xs font-mono text-gray-600">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="col-span-2">
                  <p className="font-bold text-white text-sm">{project.name}</p>
                  <p className="text-xs font-mono text-gray-600 mt-1">{project.type}</p>
                </div>
                <div className="col-span-1 flex justify-end items-center gap-4">
                  <button onClick={() => setEditingProject(project)}
                    className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">Edit</button>
                  <button onClick={() => { if (confirm("Delete this project?")) setFormData({ ...formData, projects: formData.projects.filter(p => p.id !== project.id) }); }}
                    className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">Delete</button>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications" index={5}
          action={
            <button onClick={() => {
              const title = prompt("Certification title:");
              if (!title) return;
              const subtitle = prompt("Subtitle / description:");
              const issuer = prompt("Issued by:");
              if (subtitle && issuer) setFormData({ ...formData, certifications: [...(formData.certifications || []), { id: Date.now(), title, subtitle, issuer }] });
            }}
              className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">
              + Add
            </button>
          }
        >
          <div className="space-y-0">
            {(formData.certifications?.length > 0) ? formData.certifications.map((cert, idx) => (
              <div key={cert.id} className="group grid grid-cols-4 gap-4 py-5 transition-all duration-300"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="col-span-1">
                  <span className="text-xs font-mono text-gray-600">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="col-span-2">
                  <p className="font-bold text-white text-sm">{cert.title}</p>
                  <p className="text-xs font-mono text-gray-600 mt-1">{cert.subtitle}</p>
                  <p className="text-xs font-mono text-gray-700 mt-0.5">{cert.issuer}</p>
                </div>
                <div className="col-span-1 flex justify-end items-center gap-4">
                  <button onClick={() => {
                    const title = prompt("Edit title:", cert.title);
                    if (title === null) return;
                    const subtitle = prompt("Edit subtitle:", cert.subtitle);
                    if (subtitle === null) return;
                    const issuer = prompt("Edit issuer:", cert.issuer);
                    if (issuer === null) return;
                    setFormData({ ...formData, certifications: formData.certifications.map(c => c.id === cert.id ? { ...c, title: title || c.title, subtitle: subtitle || c.subtitle, issuer: issuer || c.issuer } : c) });
                  }} className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">Edit</button>
                  <button onClick={() => { if (confirm("Delete?")) setFormData({ ...formData, certifications: formData.certifications.filter(c => c.id !== cert.id) }); }}
                    className="text-xs font-mono text-white hover:text-gray-300 transition-colors duration-200">Delete</button>
                </div>
              </div>
            )) : (
              <p className="text-xs font-mono text-gray-600 py-6">No certifications yet.</p>
            )}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Information" index={6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Email", "email", "email"],
              ["Phone", "phone", "text"],
              ["Instagram", "instagram", "text"],
              ["Facebook", "facebook", "text"],
              ["Address", "address", "text"],
            ].map(([lbl, key, type]) => (
              <div key={key} className={key === "address" ? "md:col-span-2" : ""}>
                <label className={labelClass}>{lbl}</label>
                <input type={type} value={formData.contact[key] || ""}
                  onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, [key]: e.target.value } })}
                  className={inputClass} style={inputStyle}
                />
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

