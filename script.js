const buttons = document.querySelectorAll(".theme-button");

function setTheme() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      alert('Uw heeft een thema gekozen!')
      const buttonID = button.getAttribute("data-button");
      localStorage.setItem("buttonID", buttonID);
    });
  });
}


setTheme();


