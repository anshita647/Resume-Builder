import React from "react";
import { useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  BriefcaseBusiness,
  Linkedin,
  Globe,
} from "lucide-react";

// Add this import at top

// Add this import at top

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const safeData = data || {};
  
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // ✅ THE FIX: whenever removeBackground toggles, update the image URL in data
  useEffect(() => {
    if (!data?.image || typeof data.image !== "string") return;

    const baseUrl = data.image.split("?")[0]; // strip any existing params

    if (removeBackground && data.image.includes("ik.imagekit.io")) {
      // ✅ Push bg-removed URL into data so ResumePreview gets it
      const bgRemovedUrl = `${baseUrl}?tr=e-bgremove`;
      if (data.image !== bgRemovedUrl) {
        handleChange("image", bgRemovedUrl);
      }
    } else {
      // ✅ Restore original URL when toggle is OFF
      if (data.image !== baseUrl && data.image.includes("?tr=e-bgremove")) {
        handleChange("image", baseUrl);
      }
    }
  }, [removeBackground]); // runs every time toggle changes

  // ... rest of your component stays the same
  // ... rest of your component stays the same
  const fields = [
  { key: "fullName", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];
let imageSrc = data?.image || null;
let finalImageSrc = imageSrc;

  return (
    <div className="p-3">
      <h5 className="fw-semibold text-dark">Personal Information</h5>
      <p className="text-muted small">
        Get started with your personal details
      </p>

      {/* Image Upload */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <label style={{ cursor: "pointer" }}>
          {imageSrc ? (
  <img
    src={finalImageSrc}
    alt="User"
    className="rounded-circle border"
    width="64"
    height="64"
    style={{ objectFit: "cover" }}
    onError={(e) => {
      e.target.src = imageSrc;
    }}
  />
          ) : (
            <div className="d-flex align-items-center gap-2 text-muted">
              <User size={36} className="border rounded-circle p-2" />
              <span>Upload image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg"
            className="d-none"
         onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  console.log("Uploading file...");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:3000/api/ai/upload-image", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();


    // ✅ IMPORTANT: store URL, not File
    handleChange("image", result.url);

  } catch (err) {
    console.error("Upload failed", err);
  }
}}

          />
        </label>

{typeof data?.image === "string" && (
            <div className="ms-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={removeBackground}
onChange={(e) => setRemoveBackground(e.target.checked)}
              />
              <label className="form-check-label small">
                Remove background
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Fields */}
    {fields.map((field) => {
  const Icon = field.icon;
  return (
    <div className="mb-3" key={field.key}>
      <label className="form-label d-flex align-items-center gap-2">
        <Icon size={16} />
        {field.label}
        {field.required && <span className="text-danger">*</span>}
      </label>

      <input
        type={field.type}
        className="form-control"
        value={safeData[field.key] || ""}
        required={field.required}
        placeholder={`Enter your ${field.label.toLowerCase()}`}
        onChange={(e) => handleChange(field.key, e.target.value)}
      />
    </div>
  
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
