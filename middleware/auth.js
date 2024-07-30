export default defineNuxtRouteMiddleware(async(to, from) => {
    if (import.meta.client){
        const router = useRouter();
        const config = useRuntimeConfig();
        const token = sessionStorage.getItem("pesquisaTokenUsuario");
        if (![null, undefined, ""].includes(token)){
            let resposta = await $fetch(`${config.public.API_PATH}usuarios/check`, {
                headers: {Authorization: `Bearer ${token}`}
            });
        
            if (!resposta.sucesso) return navigateTo("/login", { external: true });
        }else{
            return navigateTo("/login", { external: true });
        }
    }

});