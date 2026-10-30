import React from 'react'
import "./Card.css"



function Card({title,image,onClick,href,description,className="",ariaLabel}) {
  const content = (
    <>
      <span className="card-copy">
        <span className="title">{title}</span>
        {description && <span className="card-description">{description}</span>}
      </span>
      <div className="hovercard">
        <img src={image} alt="" />
      </div>
    </>
  )

  if (href) {
    return (
      <a className={`card ${className}`.trim()} href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel || `Open ${title} project in a new tab`}>
        {content}
      </a>
    )
  }

  return (
    <button className={`card ${className}`.trim()} type="button" onClick={onClick} aria-label={ariaLabel || `View ${title} implementation`}>
      {content}
    </button>
  )
}

export default Card
