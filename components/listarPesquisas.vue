<template>
    <v-data-table
        :items="dadosPesquisa.data"
        :headers="cabecalho"
        :loading="carregando">
        <template v-slot:top>
            <h1 class="text-center bg-primary">Pesquisas</h1>
        </template>
        <template v-slot:item.botoes="{ item }">
            <v-btn rounded="0" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)" />
            <v-btn rounded="sm" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)" />
        </template>
    </v-data-table>
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
    ];

    let carregando = ref(false);
    let dadosPesquisa = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch('http://localhost:8000/api/pesquisas');
        dadosPesquisa.data = pesquisas.dados.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao,
                created_at: item.created_at,
                tipo_entrevistado: item.tipo_entrevistado
            }
        });
        carregando.value = false;
    }

    const editar = id => {
        $fetch(`http://localhost:8000/api/pesquisas/${id}`)
        .then(resposta => {
            store.editarPesquisa(resposta.dados);
            router.push({ path: "/pesquisas/criar" });
        })
        .catch(erro => console.error(erro));
    }

    const excluir = id => {

    }

    getDados();

</script>
