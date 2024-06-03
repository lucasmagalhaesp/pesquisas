export const useGeralStore = defineStore("geral", {
    state: () => ({
        logado: false,
        token: null,
        dadosUsuario: null
    }),
    actions: {
        login(dados){
            this.logado = true;
            this.token = dados.token;
            this.dadosUsuario = dados.dadosUsuario;
        },
        logout(){
            this.logado = false;
            this.token = null;
            this.dadosUsuario = null;
        },
    },
    getters:{
        getDadosUsuario(){
            return this.dadosUsuario
        },
        perfilUsuario(){
            if ([null, undefined].includes(this.dadosUsuario)) return null;
            return this.dadosUsuario.perfil_usuario_id == 1 ? "ADMIN" : (this.dadosUsuario.perfil_usuario_id == 2 ? "AGENTE" : "ENTREVISTADO")
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    },
})