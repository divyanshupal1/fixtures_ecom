import React, { useState } from 'react';

const ReviewCard = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // You can perform actions with the provided rating and feedback, e.g., send to a server
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
    // Add additional logic as needed
  };

  return (
    <div className="review-card">
      <div>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'star-filled' : 'star-empty'}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 style={{textAlign:"left",margin:"1px 10px"}}>Feedback:</h4>
        <textarea
          placeholder='Write your Review'
          rows="3"
          cols="50"
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default ReviewCard;
