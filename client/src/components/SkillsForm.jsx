import React, { useState } from "react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="mb-4">

      {/* Header */}
      <div className="mb-3">
        <h5 className="fw-semibold">Skills</h5>
        <p className="text-muted small mb-0">
          Add your technical and soft skills
        </p>
      </div>

      {/* Input Row */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a skill (e.g. JavaScript, projects Management)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-primary"
          onClick={addSkill}
          disabled={!newSkill.trim()}
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <div className="d-flex flex-wrap gap-2 mb-3">
          {data.map((skill, index) => (
            <span
              key={index}
              className="badge bg-primary d-flex align-items-center"
            >
              {skill}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                aria-label="Remove"
                onClick={() => removeSkill(index)}
              ></button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted py-3">
          <p className="mb-1">No skills added yet</p>
          <small>Add your technical and soft skills above</small>
        </div>
      )}

      {/* Tip Box */}
      <div className="alert alert-info py-2 mb-0">
        <small>
          <strong>Tip:</strong> Add 8–12 relevant skills. Include both
          technical skills and soft skills like leadership and communication.
        </small>
      </div>

    </div>
  );
};

export default SkillsForm;
