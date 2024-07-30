<template>
    <div>
        <v-btn v-if="display.xs" :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor4 mb-3" prepend-icon="mdi-plus" @click="$router.push({ path: '/pesquisas-cadastradas/criar' })">Criar Pesquisa</v-btn>
        <v-data-table
            v-if="!display.xs"
            :items="dadosPesquisa.data"
            :headers="cabecalho"
            no-data-text="Nenhum registro encontrado"
            loading-text="Carregando..."
            :loading="carregando">
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col class="text-right">
                        <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor4" prepend-icon="mdi-plus" @click="$router.push({ path: '/pesquisas-cadastradas/criar' })">Criar Pesquisa</v-btn>
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
        <v-data-iterator v-else :items="dadosPesquisa.data" :page="page" :items-per-page="itemsPerPage">
            <template v-slot:default="{ items }">
                <template
                    v-for="(item, i) in pesquisasFiltradas.data"
                    :key="i"
                >
                    <v-card>
                        <v-card-title class="bg-cor3">
                            <strong>Código:</strong> {{ item.id }}
                        </v-card-title>
                        <v-card-text class="pt-3 bg-cor6">
                            <div>
                                <strong>Título:</strong> {{ item.titulo }}
                            </div>
                            <div>
                                <strong>Descrição:</strong> {{ item.descricao }}
                            </div>
                            <div>
                                <strong>Data de criação:</strong> {{ item.created_at }}
                            </div>
                            <div>
                                <strong>Tipo de entrevistado:</strong> {{ item.tipo_entrevistado == "A" ? "Anônimo" : "Cadastrado" }}
                            </div>
                            <div>
                                <strong>Ativa:</strong> {{ item.ativa == "S" ? "Sim" : "Não" }}
                            </div>
                        </v-card-text>
                        <v-row class="justify-center bg-cor6 ga-4 px-3 py-3">
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)">Editar</v-btn>
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)">Excluir</v-btn>
                        </v-row>
                    </v-card>

                    <br>
                </template>
            </template>
            
            <template v-slot:footer="{ pageCount }">
                <v-pagination v-model="page" :length="pageCount" @update:modelValue="atualizarListagem"></v-pagination>
            </template>
        </v-data-iterator>
    </div>
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Confirmação" class="bg-error">
            <v-card-text>
                Confirma a inativação dessa pesquisa? Ela poderá ser reativada posteriormente.
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
</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    const config = useRuntimeConfig();
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    import { useData } from '../composables/formataData'
    const { formataDataBR } = useData();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
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
    let pesquisasFiltradas = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch(`${config.public.API_PATH}pesquisas`, {
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
        atualizarListagem(1);
        carregando.value = false;
    }

    const editar = id => {
        $fetch(`${config.public.API_PATH}pesquisas/${id}`, {
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
        $fetch(`${config.public.API_PATH}pesquisas/${idExclusao.value}`, { method: "DELETE",
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
         })
        .then(resposta => getDados())
        .catch(erro => console.error(erro))
        .then(() => abrirModal.value = false);
    }

    getDados();

    let page = ref(1);
    let itemsPerPage = ref(5);

    const atualizarListagem = newPage => {
        listarPesquisas(newPage);
    }

    const listarPesquisas = page => {
        const inicio = itemsPerPage.value * page - itemsPerPage.value;
        const fim = itemsPerPage.value * page;
        pesquisasFiltradas.data = dadosPesquisa.data.slice(inicio, fim);
    }

</script>
