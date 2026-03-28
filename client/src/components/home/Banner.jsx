import React from 'react'

const Banner = () => {
  return (
    <div
      className="text-center py-2"
      style={{
        width: '100%',
        background: 'linear-gradient(to right, #ABFF7E, #FDFFFF)',
      }}
    >
      <p className="mb-0 text-success fw-medium small">
        <span className="badge bg-success me-2 px-3 py-2 rounded-pill">
          New
        </span>
        AI Website Builder
      </p>
    </div>
  )
}

export default Banner
