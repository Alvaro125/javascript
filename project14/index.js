import { router } from "./router.js";

const app = document.querySelector("#app");

document.querySelectorAll('.nolink').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault()
    click(e.target.attributes.href.value)
  })
})

function click(link) {
  const url = new CustomEvent("url", {
    detail: { 
      link: link
    }
  });
  app.dispatchEvent(url);
}

app.addEventListener('url', function(cbs){
  history.pushState({}, ``, `${cbs.detail.link}`);
  app.innerHTML = router(cbs.detail.link);
})
// retornar e avançar pagina
window.addEventListener("popstate", (evt) => {
  app.innerHTML = router(evt.target.location.pathname);
});
// carregamento da pagina
window.addEventListener("load", (evt) => {
  app.innerHTML = router(evt.target.location.pathname);
});
