<template>
    <div>
        <v-data-table
            :items="dadosPesquisa.data"
            :headers="cabecalho"
            :loading="carregando">
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col>
                        <h1 class="cor1">Pesquisas Realizadas</h1>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn prepend-icon="mdi-clipboard-list" class="bg-cor4" @click="$router.push({ path: '/pesquisas-realizadas/registrar' })">Registrar Pesquisa</v-btn>
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
        <utilitarios-modal :show-modal="abrirModal" @modal-sim="modalOK" @modal-nao="modalCancel" />
    </div>
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
        { title: "Cód. Pesquisa", align: "start", key: "pesquisa_id"},
        { title: "Título", align: "start", key: "titulo"},
        { title: "Data de Criação", align: "start", key: "created_at" },
    ];

    let abrirModal = ref(false);

    let carregando = ref(false);
    let dadosPesquisa = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch('http://localhost:8000/api/pesquisasRealizadas', {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        dadosPesquisa.data = pesquisas.dados.map(item => {
            return {
                id: item.id,
                pesquisa_id: item.pesquisa_id,
                titulo: item.pesquisa.titulo,
                created_at: item.created_at,
            }
        });
        carregando.value = false;
    }

    const editar = id => {
        $fetch(`http://localhost:8000/api/pesquisas/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        })
        .then(resposta => {
            store.editarPesquisa(resposta.dados);
            router.push({ path: "/pesquisas/criar" });
        })
        .catch(erro => console.error(erro));
    }

    const modalOK = () => {
        alert("Exclusão confirmada com sucesso");
    }

    const modalCancel = () => alert("Operação cancelada");

    function excluir(){
        abrirModal.value = !abrirModal.value;
        console.log("excluir");
    }

    getDados();

</script>
