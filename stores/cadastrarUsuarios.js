export const useCadastroUsuarioStore = defineStore("cadastroUsuario", {
    state: () => ({
        id: null,
        nome: "",
        email: "",
        senha: "",
        confirmar_senha: "",
        perfil_usuario_id: 3,
        ativo: "S",
        filtros:{
            nome: "",
            email: "",
            perfil_usuario_id: 0,
            ativo: "T",
        }
    }),
    actions: {
        editarUsuario(dados){
            this.id = dados.id;
            this.nome = dados.nome;
            this.email = dados.email;
            this.senha = "";
            this.confirmar_senha = "";
            this.perfil_usuario_id = parseInt(dados.perfil_usuario_id),
            this.ativo = dados.ativo;
        },
        salvarUsuario(token){
            const config = useRuntimeConfig();
            return new Promise((ok, error) => {
                $fetch(`${config.public.API_PATH}usuarios`, {
                    method: "POST",
                    body: {
                        dados:{
                            id: this.id,
                            nome: this.nome,
                            email: this.email,
                            senha: this.senha,
                            confirmar_senha: this.confirmar_senha,
                            perfil_usuario_id: this.perfil_usuario_id,
                            ativo: this.ativo
                        }
                    },
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(resposta => {
                    if (resposta.sucesso) ok();
                    else error();
                })
                .catch(erro => {
                    console.error("Passou aqui");
                    error(erro);
                });
            });
        },
        limparDados(){
            this.id = null;
            this.nome = "";
            this.email = "";
            this.senha = "";
            this.confirmar_senha = "";
            this.perfil_usuario_id = 3;
            this.ativo = "S";
        },
        limparFiltros(){
            this.filtros.nome = "";
            this.filtros.email = "";
            this.filtros.perfil_usuario_id = 0;
            this.filtros.ativo = "T";
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})