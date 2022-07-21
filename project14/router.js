import { pages } from "./modules/pages.js";

const routes = {
    "/": pages.main,
    "/brigadeiro": pages.brigadeiro,
    "/doces": pages.doces,
    "/cupcakes": pages.cupcakes
}

export function router(route){
    if (routes[route.length - 1 === "/"]) {
        route = route.slice(0,-1);
    }
    try{
        return routes[route]()
    } catch{
        return `<p class="red">pagina "${route}" inexistente</p>`
    }
}