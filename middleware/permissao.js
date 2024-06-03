import { useGeralStore } from "@/stores/geral"
export default defineNuxtRouteMiddleware(async(to, from) => {
    if (import.meta.client){    
        const store = useGeralStore();
        const perfilUsuario = store.perfilUsuario;

        console.log(to);

        if (perfilUsuario != "ADMIN"){
            if (to.name == "index") return navigateTo("/pesquisas-realizadas");

            const rotasPermitidas = ["index", "pesquisas-realizadas", "pesquisas-realizadas-registrar"];
            if (!rotasPermitidas.includes(to.name)) return navigateTo("/");
        }

    }

});

/* index
usuarios
usuario-criar
pesquisas-cadastradas
pesquisas-cadastradas-criar
pesquisas-cadastradas-add-pergunta
pesquisas-realizadas
pesquisas-realizadas-registrar */