export const useCadastroPesquisaStore = defineStore("cadastroPesquisa", {
    state: () => ({
        id: null,
        categoria_id: 0,
        titulo: "",
        descricao: "",
        tipo_entrevistado: "A",
        perguntas: [],
        respostas: []
    }),
    actions: {
        getPergunta(id){
            const dadosPergunta = this.perguntas.find(perg => perg.id == id);
            if (dadosPergunta != undefined) {
                this.respostas = [...dadosPergunta.respostas];
                return dadosPergunta.descricao;
            }
            return "";
        },
        addPergunta(id, descricao){
            if (id == null){
                this.perguntas.push({
                    id: `temp${Math.floor(Math.random() * 500)}`,
                    num_ordem: this.perguntas.length + 1,
                    descricao,
                    respostas: this.respostas
                });
            }else{
                this.perguntas.forEach(perg => {
                    if (perg.id == id) {
                        //perg.num_ordem = this.perguntas.length + 1;
                        perg.descricao = descricao;
                        perg.respostas = this.respostas;
                    }
                })
            }
            this.respostas = [];
        },
        addResposta(idResposta, resposta){
            if (idResposta == null) this.respostas.push({ id: this.respostas.length + 1, num_ordem: this.respostas.length + 1, descricao: resposta });
            else{
                this.respostas.forEach(resp => {
                    if (resp.id == idResposta) resp.descricao = resposta;
                })
            }
        },
        cancelarPergunta(){
            this.respostas = [];
        },
        cancelarPesquisa(){
            this.id = null;
            this.categoria_id = 0;
            this.titulo = "";
            this.descricao = "";
            this.tipo_entrevistado = "A";
            this.perguntas = [];
            this.respostas = [];
        },
        salvarPesquisa(){
            return new Promise((ok, error) => {
                $fetch("http://localhost:8000/api/pesquisas", {
                    method: 'POST',
                    body: {
                        dados:{
                            id: this.id,
                            categoria_id: 2,
                            titulo: this.titulo,
                            descricao: this.descricao,
                            tipo_entrevistado: this.tipo_entrevistado,
                            perguntas: this.perguntas
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
        editarPesquisa(dados){
            this.id = dados.id;
            this.categoria_id = dados.categoria_id;
            this.titulo = dados.titulo;
            this.descricao = dados.descricao;
            this.tipo_entrevistado = dados.tipo_entrevistado;
            this.perguntas = dados.perguntas;
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    },
})