export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        dadosGerais: {
            usuariosAtivos: 0,
            usuariosInativos: 0,
            pesquisasAtivas: 0,
            pesquisasInativas: 0,
            pesquisasRealizadas: 0
        },
        pesquisasRealizadas: [],
    }),
    actions: {
        setDadosGerais(dados){
            this.dadosGerais = dados;
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    },
})