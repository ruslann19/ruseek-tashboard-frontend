const autoAlert = (message) => {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;

  Object.assign(alertBox.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    zIndex: "9999",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  });

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 1000);
};

export default autoAlert;
