import React from "react";

function CardForm({ formData, handleChange }){
  return (
      <div>
          <label htmlFor="front">
            <h4>Front</h4>
          </label>
          <textarea
            id="front"
            type="textarea"
            name="front"
            rows="4"
            value={formData.front}
            placeholder="Front side of card"
            required
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <label htmlFor="back">
            <h4>Back</h4>
          </label>
          <textarea
            id="back"
            type="textarea"
            name="back"
            rows="4"
            value={formData.back}
            placeholder="Back side of card"
            required
            onChange={handleChange}
            style={{ width: "100%" }}
          />
      </div>
  )
}

export default CardForm;