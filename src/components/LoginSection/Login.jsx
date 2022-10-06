import React, { Component } from "react";

function Login() {
  const handleKeyDown = (e, idx) => {
    const codes = document.querySelectorAll(".code");
    if (e.key >= 0 && e.key <= 9) {
      codes[idx].value = "";
      setTimeout(() => codes[idx + 1].focus(), 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => codes[idx - 1].focus(), 10);
    }
  };

  return (
    <div className="login-container">
      <h2>Verify Your Account</h2>
      <div className="code-container">
        <input
          type="number"
          class="code"
          placeholder="0"
          min="0"
          max="9"
          required
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          class="code"
          placeholder="0"
          min="0"
          max="9"
          required
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          class="code"
          placeholder="0"
          min="0"
          max="9"
          required
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          class="code"
          placeholder="0"
          min="0"
          max="9"
          required
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Login;
