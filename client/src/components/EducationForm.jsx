import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {

  // ✅ Add Education
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  // ✅ Remove Education
  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ✅ Update Field
  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="mb-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
        <div>
          <h5 className="fw-bold">Education</h5>
          <p className="text-muted small">
            Add your education details
          </p>

          <button
            type="button"
            onClick={addEducation}
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
          >
            <Plus size={16} />
            Add Education
          </button>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <GraduationCap size={40} className="mb-3 opacity-50" />
          <p className="mb-1">No education added yet</p>
          <small>Click Add Education to get started</small>
        </div>
      ) : (
        data.map((education, index) => (
          <div
            key={index}
            className="p-3 border rounded mb-3 bg-light"
          >

            {/* Top Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">
                Education #{index + 1}
              </h6>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="btn btn-sm btn-outline-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Institution + Degree */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Degree(e.g,Bachelor's,Master's)"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Field + Graduation Date */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  type="month"
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* GPA */}
            <div>
              <input
                type="text"
                placeholder="GPA (Optional)"
                value={education.gpa}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                className="form-control"
              />
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default EducationForm;
