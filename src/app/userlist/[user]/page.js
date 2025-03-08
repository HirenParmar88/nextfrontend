"use client";
export default function User({ params }) {
  console.log(params);

  return (
    <div>
      <h1>User Details</h1>
      <h2>user ID :{params.user}</h2>
    </div>
  );
}
