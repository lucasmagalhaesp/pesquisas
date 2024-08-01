<template>
    <div>
        <v-btn v-if="display.xs" :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor2" prepend-icon="mdi-filter" rounded="sm" @click="filtPesquisas = !filtPesquisas">Filtrar </v-btn>
        <v-btn v-if="display.xs" :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-clipboard-list" class="bg-cor4 mb-3" @click="$router.push({ path: '/pesquisas-realizadas/registrar' })">Registrar Pesquisa</v-btn>
        <v-data-table
            v-if="!display.xs"
            :items="dadosPesquisa.data"
            :headers="cabecalho"
            :loading="carregando"
            no-data-text="Nenhum registro encontrado"
            loading-text="Carregando..."
        >
            <template v-slot:top>
                <v-row class="mb-1 justify-end ga-3" :class="!display.xs ? 'pr-3' : ''">
                    <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor2" prepend-icon="mdi-filter" rounded="sm" @click="filtPesquisas = !filtPesquisas">Filtrar </v-btn>
                    <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-clipboard-list" class="bg-cor4" @click="$router.push({ path: '/pesquisas-realizadas/registrar' })">Registrar Pesquisa</v-btn>
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
                <v-btn rounded="0" size="small" icon="mdi-view-list" color="primary" @click="visualizar(item.id)" title="Visualizar Pesquisa" />
                <v-btn rounded="0" size="small" icon="mdi-file-pdf-box" color="info" @click="gerarRelatorio(item.id)" title="Gerar Relatório" />
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
                                <strong>Cód. Pesquisa:</strong> {{ item.pesquisa_id }}
                            </div>
                            <div>
                                <strong>Título:</strong> {{ item.titulo }}
                            </div>
                            <div>
                                <strong>Data de criação:</strong> {{ item.created_at }}
                            </div>
                        </v-card-text>
                        <v-row class="justify-center bg-cor6 ga-4 px-3 py-3">
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-view-list" color="primary" @click="visualizar(item.id)">Visualizar Pesquisa</v-btn>
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-file-pdf-box" color="info" @click="gerarRelatorio(item.id)">Gerar Relatório</v-btn>
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
    
    <filtrar-pesquisas-realizadas :abrir-opcoes="filtPesquisas" @getDados="getDados" />

</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    const config = useRuntimeConfig();
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    const store = usePesquisasRealizadas();
    import { useData } from '../composables/formataData'
    const { formataDataBR } = useData();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const filtPesquisas = ref(false);
    const cabecalho = [
        { title: "", align: "start", key: "botoes", width: "150"},
        { title: "Código", align: "start", key: "id"},
        // { title: "Cód. Pesquisa", align: "start", key: "pesquisa_id"},
        { title: "Agente", align: "start", key: "agente"},
        { title: "Entrevistado", align: "start", key: "entrevistado"},
        { title: "Título", align: "start", key: "titulo"},
        { title: "Data de Criação", align: "start", key: "created_at" },
    ];

    let abrirModal = ref(false);

    let carregando = ref(false);
    let dadosPesquisa = reactive({data:[]});
    let pesquisasFiltradas = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch(`${config.public.API_PATH}pesquisasRealizadas/getDados`, {
            method: "POST",
            body: { filtros: store.filtros },
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        dadosPesquisa.data = pesquisas.dados.map(item => {
            return {
                id: item.id,
                pesquisa_id: item.pesquisa_id,
                titulo: item.pesquisa.titulo,
                created_at: item.created_at,
                agente: item.agente.nome,
                entrevistado: ![undefined, null, ''].includes(item.entrevistado) ? item.entrevistado.nome : "Anônimo"
            }
        });
        atualizarListagem(1);
        carregando.value = false;
    }

    /* const editar = id => {
        $fetch(`${config.public.API_PATH}pesquisas/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        })
        .then(resposta => {
            store.editarPesquisa(resposta.dados);
            router.push({ path: "/pesquisas/criar" });
        })
        .catch(erro => console.error(erro));
    } */

    function excluir(){
        abrirModal.value = !abrirModal.value;
        console.log("excluir");
    }

    const visualizar = id => {
        router.push({ path: `/pesquisas-realizadas/${id}` });
    }

    const gerarRelatorio = id => {
        window.open(`${config.public.API_PATH}pesquisasRealizadas/gerarRelatorio/${id}`, "_blank")
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
