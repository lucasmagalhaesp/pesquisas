export const usePesquisasRealizadas = defineStore("pesquisasRealizadas", {
    state: () => ({
        pesquisa_id: 2,
		usuario_id: 1,
		entrevistado_id: null,
		perguntas_respostas: [
			/* {
				"pergunta_id": 1,
				"resposta_id": 2
			},
			{
				"pergunta_id": 2,
				"resposta_id": 4
			} */
		]
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
        salvar(){
            return new Promise((ok, erro) => {$fetch("http://localhost:8000/api/pesquisasRealizadas", {
                method: "POST",
                body: {
                    dados:{
                        pesquisa_id: this.pesquisa_id,
                            usuario_id: this.usuario_id,
                            entrevistado_id: this.entrevistado_id,
                            perguntas_respostas: this.perguntas_respostas
                        }
                    }
                })
                .then(resposta => {
                    if (resposta.sucesso) ok();
                    else erro();
                })
                .catch(erro => {
                    console.error(erro);
                    erro();
                });
            })
        },
        limparDados(){
            this.pesquisa_id = 2;
            this.usuario_id = 1;
            this.entrevistado_id = null;
            this.perguntas_respostas = [];
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})