import { useState } from "react";

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  portfolioData, 
  onUpdateData 
}) {
  const [formData, setFormData] = useState(portfolioData);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setUploadingImage(true);
      
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject({
          ...editingProject,
          imageUrl: reader.result
        });
        setUploadingImage(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditingProject({
      ...editingProject,
      imageUrl: null
    });
  };

  const handleSave = async () => {
    try {
      await onUpdateData(formData);
      alert("Changes saved successfully to Firebase!");
    } catch (error) {
      console.error('Save error:', error);
      alert("Failed to save changes. Please check your Firebase configuration and try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black overflow-y-auto z-[100]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="flex justify-between items-center px-6 sm:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black text-xl">✏️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Edit Mode - All changes are live</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all duration-300"
            >
              💾 Save All Changes
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white/10 text-white font-semibold rounded-md hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              ✕ Exit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Personal Info Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>👤</span> Personal Information
          </h2>
          
          {/* Profile Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Profile Image</label>
            {formData.personalInfo?.profileImage ? (
              <div className="flex items-center gap-4">
                <img
                  src={formData.personalInfo.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/40"
                />
                <div className="flex-1 space-y-2">
                  <label className="block">
                    <span className="sr-only">Change profile image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (!file.type.startsWith('image/')) {
                            alert('Please select an image file');
                            return;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            alert('Image size should be less than 5MB');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({
                              ...formData,
                              personalInfo: { ...formData.personalInfo, profileImage: reader.result }
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-sm text-gray-300
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-white/10 file:text-white
                        hover:file:bg-white/20 file:cursor-pointer
                        file:transition-all file:duration-300"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, profileImage: null }
                    })}
                    className="px-4 py-2 bg-red-500/20 text-red-300 text-sm rounded-md hover:bg-red-500/30 border border-red-500/40 transition-all"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Click to upload profile image</span>
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (!file.type.startsWith('image/')) {
                        alert('Please select an image file');
                        return;
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Image size should be less than 5MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, profileImage: reader.result }
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.personalInfo?.name || "Marshal Cholo Clemente"}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, name: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Title/Role</label>
              <input
                type="text"
                value={formData.personalInfo?.title || "4th-year BSIT Student"}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, title: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                placeholder="Your title or role"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Birthday</label>
              <input
                type="text"
                value={formData.personalInfo?.birthday || "September 21, 2004"}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, birthday: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                placeholder="Your birthday"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Age</label>
              <input
                type="text"
                value={formData.personalInfo?.age || "21"}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, age: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                placeholder="Your age"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📝</span> About Me
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Paragraph 1</label>
              <textarea
                value={formData.about.paragraph1}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, paragraph1: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Paragraph 2</label>
              <textarea
                value={formData.about.paragraph2}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, paragraph2: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Paragraph 3</label>
              <textarea
                value={formData.about.paragraph3}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, paragraph3: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                rows="3"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>⚡</span> Skills & Technologies
          </h2>
          {Object.entries(formData.skills).map(([category, skills]) => (
            <div key={category} className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <button
                  onClick={() => {
                    const skill = prompt(`Add new skill to ${category}:`);
                    if (skill) {
                      setFormData({
                        ...formData,
                        skills: {
                          ...formData.skills,
                          [category]: [...formData.skills[category], skill]
                        }
                      });
                    }
                  }}
                  className="px-3 py-1 bg-white/10 text-white text-sm rounded-md hover:bg-white/20 border border-white/20"
                >
                  + Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/10 px-4 py-2 rounded-md flex items-center gap-2 border border-white/20"
                  >
                    <span className="text-white text-sm">{skill}</span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          skills: {
                            ...formData.skills,
                            [category]: formData.skills[category].filter((_, i) => i !== index)
                          }
                        });
                      }}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>💼</span> Projects
            </h2>
            <button
              onClick={() => setEditingProject({ id: Date.now(), name: "", description: "", type: "" })}
              className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200"
            >
              + Add Project
            </button>
          </div>

          {editingProject ? (
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {editingProject.name ? "Edit Project" : "New Project"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                  placeholder="Project Name"
                />
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                  rows="3"
                  placeholder="Project Description"
                />
                <input
                  type="text"
                  value={editingProject.type}
                  onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
                  placeholder="Project Type (e.g., Website, Mobile App)"
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Project Image</label>
                  
                  {editingProject.imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden border border-white/20">
                        <img
                          src={editingProject.imageUrl}
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition-all"
                        >
                          Remove Image
                        </button>
                      </div>
                      <label className="block">
                        <span className="sr-only">Change image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-300
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-white/10 file:text-white
                            hover:file:bg-white/20 file:cursor-pointer
                            file:transition-all file:duration-300"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      {uploadingImage && (
                        <p className="text-sm text-gray-400 text-center">Uploading image...</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (editingProject.name && editingProject.description && editingProject.type) {
                        const existingIndex = formData.projects.findIndex(p => p.id === editingProject.id);
                        if (existingIndex >= 0) {
                          const newProjects = [...formData.projects];
                          newProjects[existingIndex] = editingProject;
                          setFormData({ ...formData, projects: newProjects });
                        } else {
                          setFormData({
                            ...formData,
                            projects: [...formData.projects, editingProject]
                          });
                        }
                        setEditingProject(null);
                      } else {
                        alert("Please fill in all required fields");
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200"
                  >
                    Save Project
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 bg-white/10 text-white font-semibold rounded-md hover:bg-white/20 border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white text-lg">{project.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this project?")) {
                          setFormData({
                            ...formData,
                            projects: formData.projects.filter(p => p.id !== project.id)
                          });
                        }
                      }}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{project.type}</p>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>🎓</span> Certifications
            </h2>
            <button
              onClick={() => {
                const title = prompt("Certification title:");
                if (title) {
                  const subtitle = prompt("Certification subtitle/description:");
                  const issuer = prompt("Issued by:");
                  if (subtitle && issuer) {
                    setFormData({
                      ...formData,
                      certifications: [
                        ...(formData.certifications || []),
                        { id: Date.now(), title, subtitle, issuer }
                      ]
                    });
                  }
                }
              }}
              className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200"
            >
              + Add Certification
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.certifications && formData.certifications.length > 0) ? (
              formData.certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white text-lg">{cert.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const title = prompt("Edit certification title:", cert.title);
                        if (title !== null) {
                          const subtitle = prompt("Edit subtitle/description:", cert.subtitle);
                          if (subtitle !== null) {
                            const issuer = prompt("Edit issuer:", cert.issuer);
                            if (issuer !== null) {
                              setFormData({
                                ...formData,
                                certifications: formData.certifications.map(c => 
                                  c.id === cert.id 
                                    ? { ...c, title: title || c.title, subtitle: subtitle || c.subtitle, issuer: issuer || c.issuer }
                                    : c
                                )
                              });
                            }
                          }
                        }
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this certification?")) {
                          setFormData({
                            ...formData,
                            certifications: (formData.certifications || []).filter(c => c.id !== cert.id)
                          });
                        }
                      }}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{cert.subtitle}</p>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold">Issued by:</span> {cert.issuer}
                </p>
              </div>
            ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-400">
                <p>No certifications yet. Click "+ Add Certification" to add one.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📧</span> Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram</label>
              <input
                type="text"
                value={formData.contact.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, instagram: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Facebook</label>
              <input
                type="text"
                value={formData.contact.facebook}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, facebook: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
              <input
                type="text"
                value={formData.contact.address}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, address: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
