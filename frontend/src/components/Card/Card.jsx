// import { Button } from './Button'; // Import the Button component or adjust the import path

export const Card = ({imgSrc,imgAlt,title,description,buttonText}) => {
  return (
    <div className="card">
      <img src={imgSrc} alt={imgAlt} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button>{buttonText}</button> {/* Use the Button component */}
      </div>
    </div>
  );
};
