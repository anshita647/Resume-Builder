import React from "react";
import Title from "./Title";
import "bootstrap/dist/css/bootstrap.min.css";

const Testimonial = () => {
  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
      name: "Jordan Lee",
      handle: "@jordantalks",
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="card shadow-sm mx-3 flex-shrink-0" style={{ width: "18rem" }}>
      <div className="card-body">
        <div className="d-flex gap-2 align-items-center">
          <img
            src={card.image}
            alt="User"
            className="rounded-circle"
            width="44"
            height="44"
          />
          <div>
            <div className="fw-semibold d-flex align-items-center gap-1">
              {card.name}
              <svg width="12" height="12" fill="green" viewBox="0 0 12 12">
                <path d="M6 0l1.8 1.2L10 1.5l-.3 2.1L11 6l-1.3 2.4.3 2.1-2.2-.3L6 12l-1.8-1.2-2.2.3.3-2.1L1 6l1.3-2.4L2 1.5l2.2.3L6 0z" />
              </svg>
            </div>
            <small className="text-muted">{card.handle}</small>
          </div>
        </div>

        <p className="mt-3 text-secondary small">
          Radiant made undercutting all of our competitors an absolute breeze.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Heading Section */}
      <div
        id="testimonial"
        className="d-flex flex-column align-items-center my-5"
        style={{ scrollMarginTop: "3rem" }}
      >
        <div className="d-flex align-items-center gap-2 small text-success bg-success bg-opacity-10 border border-success rounded-pill px-3 py-1 mb-4">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
          <span>Testimonials</span>
        </div>

        <Title
          title="What users say about us"
          description="See how our AI-powered resume builder has helped thousands of users create professional resumes and land their dream jobs."
        />
      </div>

      {/* Marquee Row */}
      <div className="container overflow-hidden position-relative">
        <div className="d-flex marquee pt-4 pb-3">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Reverse Marquee */}
      <div className="container overflow-hidden position-relative">
        <div className="d-flex marquee marquee-reverse pt-4 pb-3">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marquee {
          animation: marquee 25s linear infinite;
          min-width: 200%;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
