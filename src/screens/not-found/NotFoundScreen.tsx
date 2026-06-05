import { memo } from "react";
import { Link } from "react-router-dom";
import "./NotFoundScreen.css";

export const NotFoundScreen = memo(() => {
  return (
    <div className="nf">
      <div className="nf__card nf__card--orange">
        <p className="nf__eyebrow">Error 404</p>
        <p className="nf__code">404</p>
        <p className="nf__hint">Page not found</p>
      </div>

      <h1 className="nf__title">You've wandered off the canvas.</h1>
      <p className="nf__sub">
        This page doesn't exist. Head back and pick up where you left off.
      </p>

      <Link to="/" id="btn-go-home" className="btn-primary">
        ← Back to dashboard
      </Link>
    </div>
  );
});
