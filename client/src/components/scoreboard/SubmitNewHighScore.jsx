import React from "react";

export default function SubmitScore({ postData, updateName }) {
  return (
    <form onSubmit={postData}>
      <label htmlFor="score">Name</label>
      <input
        type="text"
        name="name"
        onChange={(e) => updateName(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}
