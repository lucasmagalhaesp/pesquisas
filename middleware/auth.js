export default defineNuxtRouteMiddleware(async(to, from) => {
    if (import.meta.client){
        const token = sessionStorage.getItem("pesquisaTokenUsuario");
        if (![null, undefined, ""].includes(token)){
            let resposta = await $fetch(`http://localhost:8000/api/usuarios/check`, {
                headers: {Authorization: `Bearer ${token}`}
            });
        
            if (!resposta.sucesso) return navigateTo("/login");
        }else{
            return navigateTo("/login");
        }
    }

});