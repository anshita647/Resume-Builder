// Dashboard.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { Plus, Upload, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../configs/api";
import pdftoText from "react-pdftotext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const gradients = [
    "linear-gradient(to right, #10b981, #059669)",
    "linear-gradient(to right, #ec4899, #db2777)",
    "linear-gradient(to right, #f59e0b, #d97706)",
  ];

  // Load all resumes from backend
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Resumes API response:", data);
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Protect route
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      loadAllResumes();
    }
  }, [token, navigate]);

  // CREATE RESUME
  const createResume = async (e) => {
    try {
      e.preventDefault();
      if (!title.trim()) return toast.error("Title is required");

      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data?.resume?._id) return toast.error("Failed to create resume");

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreate(false);

      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // UPLOAD RESUME
  const uploadResume = async (e) => {
    try {
      e.preventDefault();
      if (!resumeFile) return toast.error("Please select a file");
      if (!title.trim()) return toast.error("Title is required");

      setIsLoading(true);

      const resumeText = await pdftoText(resumeFile);

      const createResponse = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const resumeId = createResponse?.data?.resume?._id;

      if (!resumeId) {
        setIsLoading(false);
        return toast.error("Failed to create resume");
      }

      await api.put(
        `/api/ai/update-resume/${resumeId}`,
        { resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadAllResumes();

      setTitle("");
      setResumeFile(null);
      setShowUpload(false);

      navigate(`/app/builder/${resumeId}`);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // EDIT
  const handleEdit = (resume) => {
    setSelectedResume(resume);
    setEditTitle(resume.title);
    setShowEdit(true);
  };

  const saveEdit = async () => {
    try {
      const { data } = await api.put(
        `/api/resumes/update/${selectedResume._id}`,
        { title: editTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAllResumes((prev) =>
        prev.map((r) =>
          r._id === selectedResume._id ? { ...r, title: editTitle } : r
        )
      );

      toast.success(data.message || "Title updated");
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // DELETE
  const handleDelete = async (resume) => {
    console.log("Resume object before delete:", resume);
    console.log("Resume _id:", resume?._id);

    if (window.confirm(`Delete "${resume.title}"?`)) {
      try {
        await api.delete(`/api/resumes/${resume._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllResumes((prev) => prev.filter((r) => r._id !== resume._id));
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  const handleShare = (resume) => {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = `${frontendUrl}/view/${resume._id}`;

    if (navigator.share) {
      navigator.share({
        title: resume.title,
        url: resumeUrl,
      });
    } else {
      alert("Share not supported on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

 
     const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData);

    // Remove image object before sending if it's a File
    if (updatedResumeData.personalInfo.image instanceof File) {
      delete updatedResumeData.personalInfo.image;
    }

    const formData = new FormData();
    formData.append("resumeData", JSON.stringify(updatedResumeData));
    if (removeBackground) formData.append("removeBackground", "true");

    // Only append file if it's a real File object
    if (resumeData.personalInfo.image instanceof File) {
      formData.append("image", resumeData.personalInfo.image); // ✅ 'image' field matches backend
    }

    const { data } = await api.put(
      `/api/resumes/update/${resumeData._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResumeData(data.resume);
    toast.success(data.message);
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || error.message);
  }
};

  return (
    <>
      <Container
        fluid
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
          minHeight: "100vh",
        }}
      >
        <p
          className="fw-semibold text-center mb-5"
          style={{ fontSize: "1.6rem" }}
        >
          Welcome, {user?.name} 👋
        </p>

        <div className="d-flex gap-4 justify-content-center flex-wrap mb-5">
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ width: "220px", height: "180px", borderStyle: "dashed" }}
          >
            <Plus size={28} />
            <span className="mt-2">Create Resume</span>
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => setShowUpload(true)}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ width: "220px", height: "180px", borderStyle: "dashed" }}
          >
            <Upload size={28} />
            <span className="mt-2">Upload Existing</span>
          </Button>
        </div>

        <hr className="my-5" />

        <Row className="g-4">
          {allResumes.map((resume, index) => {
            const gradient = gradients[index % gradients.length];

            return (
              <Col key={resume._id || index} xs={6} md={3}>
                <Card className="shadow-sm border-0">
                  <div style={{ height: 5, background: gradient }} />

                  <Card.Body className="text-center">
                    <div
                      className="mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: gradient,
                      }}
                    >
                      {resume.title?.charAt(0)}
                    </div>

                    <h6>{resume.title}</h6>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleEdit(resume)}
                      >
                        <Pencil size={14} />
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(resume)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* CREATE MODAL */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Resume</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={createResume}>
            <Form.Control
              className="mb-3"
              placeholder="Resume title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Button type="submit" className="w-100">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* UPLOAD MODAL */}
      <Modal show={showUpload} onHide={() => setShowUpload(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={uploadResume}>
            <Form.Control
              type="file"
              accept="application/pdf"
              className="mb-3"
              required
              onChange={(e) => setResumeFile(e.target.files[0])}
            />

            <Form.Control
              className="mb-3"
              placeholder="Resume title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Button type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resume Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
          >
            <Form.Control
              className="mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />

            <Button type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dashboard;