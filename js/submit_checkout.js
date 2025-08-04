const scriptURL =
  "https://script.google.com/macros/s/AKfycbyY1s9ivzzAVoJbIH8gXM05cn3HkO0RqqMgVG3eqNRd01SfWWUzXk-r8nNmTqThIsAe_Q/exec";

let form = document.forms["form_contactt"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      setTimeout(() => {
        localStorage.removeItem("cart");
        window.location.reload();
      }, 3000);
    })
    .catch((error) => console.error("error!", error.message));
});
