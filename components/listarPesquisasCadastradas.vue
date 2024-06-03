<template>
    <div>
        <v-data-table
            :items="dadosPesquisa.data"
            :headers="cabecalho"
            :loading="carregando">
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col>
                        <h1 class="cor1">Pesquisas Cadastradas</h1>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn class="bg-cor4" prepend-icon="mdi-plus" @click="$router.push({ path: 'pesquisas-cadastradas/criar' })">Criar Pesquisa</v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:headers="{ columns }">
                <tr class="bg-cor3">
                    <template v-for="column in columns" :key="column.key">
                        <th>{{ column.title }}</th>
                    </template>
                </tr>
            </template>
            <template v-slot:item.botoes="{ item }">
                <v-btn rounded="0" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)" />
                <v-btn rounded="sm" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)" />
            </template>
        </v-data-table>
        <!-- <utilitarios-modal :show-modal="abrirModal" @modal-sim="modalOK" @modal-nao="modalCancel" /> -->
    </div>
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Confirmação" class="bg-error">
            <v-card-text>
                Confirma a exclusão dessa pesquisa?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="SIM"
                    @click="excluirPesquisa"
                    color="default"
                    text-color="error"
                    variant="flat"
                ></v-btn>
                <v-btn
                    text="NÃO"
                    @click="abrirModal = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- <h1>{{ testando }}</h1> -->

</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    import { useData } from '../composables/formataData'
    const { formataDataBR } = useData();
    const router = useRouter();
    const cabecalho = [
        { title: "", align: "start", key: "botoes", width: "150"},
        { title: "Código", align: "start", key: "id"},
        { title: "Título", align: "start", key: "titulo"},
        { title: "Descrição", align: "start", key: "descricao"},
        { title: "Data de Criação", align: "start", key: "created_at" },
        { title: "Tipo de Entrevistado", align: "start", key: "tipo_entrevistado", value: item => item.tipo_entrevistado == "A" ? "Anônimo" : "Cadastrado" },
        { title: "Ativa", align: "start", key: "ativa", value: item => item.ativa == "S" ? "Sim" : "Não" },
    ];

    let abrirModal = ref(false);
    let idExclusao = ref(null);

    // const emit = defineEmits(["showmodal"]);

    let carregando = ref(false);
    let dadosPesquisa = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch('http://localhost:8000/api/pesquisas', {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        dadosPesquisa.data = pesquisas.dados.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao,
                created_at: item.created_at,
                tipo_entrevistado: item.tipo_entrevistado,
                ativa: item.ativa
            }
        });
        carregando.value = false;
    }

    const editar = id => {
        $fetch(`http://localhost:8000/api/pesquisas/${id}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        })
        .then(resposta => {
            store.editarPesquisa(resposta.dados);
            router.push({ path: "/pesquisas-cadastradas/criar" });
        })
        .catch(erro => console.error(erro));
    }

    const excluir = id => {
        abrirModal.value = true;
        idExclusao.value = id;
    }

    const excluirPesquisa = () => {
        $fetch(`http://localhost:8000/api/pesquisas/${idExclusao.value}`, { method: "DELETE",
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
         })
        .then(resposta => getDados())
        .catch(erro => console.error(erro))
        .then(() => abrirModal.value = false);
    }

    getDados();

</script>
