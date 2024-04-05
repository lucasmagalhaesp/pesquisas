export const useCadastroUsuarioStore = defineStore("cadastroUsuario", {
    state: () => ({
        id: null,
        nome: "",
        email: "",
        senha: "",
        confirmar_senha: "",
        perfil_usuario_id: "2",
        ativo: "S"
    }),
    actions: {
        editarUsuario(dados){
            this.id = dados.id;
            this.nome = dados.nome;
            this.email = dados.email;
            this.senha = "";
            this.confirmar_senha = "";
            this.perfil_usuario_id = dados.perfil_usuario_id,
            this.ativo = dados.ativo;
        },
        salvarUsuario(){
            return new Promise((ok, error) => {
                $fetch("http://localhost:8000/api/usuarios", {
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
                    }
                })
                .then(resposta => {
                    if (resposta.sucesso) ok();
                    else error();
                })
                .catch(erro => {
                    console.error(erro);
                    error();
                });
            });
        },
        limparDados(){
            this.id = null,
            this.nome = "",
            this.email = "",
            this.senha = "",
            this.confirmar_senha = "",
            this.perfil_usuario_id = 2,
            this.ativo = "S"
        },
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})