import React from "react";
import { Plus, Trash2, Folder } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {
  // ✅ Add projects
  const addprojects = () => {
    const newprojects = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newprojects]);
  };

  // ✅ Remove projects
  const removeprojects = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ✅ Update projects
  const updateprojects = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
        <div>
          <h5 className="fw-bold">Projects</h5>
          <p className="text-muted small">Add your projects</p>

          <button
            type="button"
            onClick={addprojects}
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
          >
            <Plus size={16} />
            Add projects
          </button>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <Folder size={40} className="mb-3 opacity-50" />
          <p className="mb-1">No professionalSummary added yet</p>
          <small>Click Add projects to get started</small>
        </div>
      ) : (
        data.map((projects, index) => (
          <div key={index} className="p-3 border rounded mb-3 bg-light">
            {/* Top Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">projects #{index + 1}</h6>

              <button
                type="button"
                onClick={() => removeprojects(index)}
                className="btn btn-sm btn-outline-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Name + Type */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="projects Name"
                  value={projects.name || ""}
                  onChange={(e) =>
                    updateprojects(index, "name", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="projects Type (Web App, Mobile, etc)"
                  value={projects.type}
                  onChange={(e) =>
                    updateprojects(index, "type", e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <textarea
                rows={4}
                className="form-control"
                placeholder="Describe the projects..."
                value={projects.description}
                onChange={(e) =>
                  updateprojects(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectForm;
