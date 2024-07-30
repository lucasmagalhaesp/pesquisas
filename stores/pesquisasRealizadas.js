export const usePesquisasRealizadas = defineStore("pesquisasRealizadas", {
    state: () => ({
        pesquisa_id: 1,
		usuario_id: null,
		entrevistado_id: null,
        nome: "",
        email: "",
		perguntas_respostas: [],
        numPergunta: 1
    }),
    actions: {
        initPerguntasRespostas(perguntas){
            this.perguntas_respostas = perguntas.map(perg => {
                return {
                    pergunta_id: perg.id,
				    resposta_id: null
                }
            });
        },
        salvar(token){
            const config = useRuntimeConfig();
            return new Promise((ok, erro) => {$fetch(`${config.public.API_PATH}pesquisasRealizadas`, {
                method: "POST",
                body: {
                    dados:
                        {
                            pesquisa_id: this.pesquisa_id,
                            usuario_id: this.usuario_id,
                            entrevistado_id: this.entrevistado_id,
                            perguntas_respostas: this.perguntas_respostas,
                            nome: this.nome,
                            email: this.email
                        }
                    },
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(resposta => {
                    if (resposta.sucesso) ok();
                    else erro();
                })
                .catch(error => {
                    console.error(erro);
                    erro(error);
                });
            })
        },
        limparDados(){
            this.pesquisa_id = 1;
            this.usuario_id = null;
            this.entrevistado_id = null;
            this.perguntas_respostas = [];
            this.nome = "";
            this.email = "";
            this.numPergunta = 1;
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})