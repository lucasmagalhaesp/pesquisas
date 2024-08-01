export const useCadastroPesquisaStore = defineStore("cadastroPesquisa", {
    state: () => ({
        id: null,
        titulo: "",
        descricao: "",
        ativa: "S",
        tipo_entrevistado: "A",
        perguntas: [],
        respostas: [],
        filtros: {
            titulo: "",
            descricao: "",
            ativa: "T",
            tipo_entrevistado: "T"
        }
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
            this.titulo = "";
            this.descricao = "";
            this.ativa = "S";
            this.tipo_entrevistado = "A";
            this.perguntas = [];
            this.respostas = [];
        },
        salvarPesquisa(token){
            const config = useRuntimeConfig();
            return new Promise((ok, error) => {
                $fetch(`${config.public.API_PATH}pesquisas`, {
                    method: 'POST',
                    body: {
                        dados:{
                            id: this.id,
                            titulo: this.titulo,
                            descricao: this.descricao,
                            ativa: this.ativa,
                            tipo_entrevistado: this.tipo_entrevistado,
                            perguntas: this.perguntas
                        }
                    },
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(resposta => {
                    if (resposta.sucesso) ok();
                    else error();
                })
                .catch(erro => {
                    console.error(erro);
                    error(erro);
                });
            });
        },
        editarPesquisa(dados){
            this.id = dados.id;
            this.titulo = dados.titulo;
            this.ativa = dados.ativa;
            this.descricao = dados.descricao;
            this.tipo_entrevistado = dados.tipo_entrevistado;
            this.perguntas = dados.perguntas;
        },
        limparFiltros(){
            this.filtros.titulo = "";
            this.filtros.descricao = "";
            this.filtros.ativa = "T";
            this.filtros.tipo_entrevistado = "T";
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    },
})