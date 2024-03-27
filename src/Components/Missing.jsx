import { Link } from "react-router-dom";
const Missing = () => {
  return (
    <main className="missingPage">
      <h1>Missing Page</h1>
      <p>
        You have landed to some wrong link, <Link to="/">click here</Link> to go
        back to home page.
      </p>
    </main>
  );
};

export default Missing;
