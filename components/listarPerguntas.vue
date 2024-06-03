<template>
    <v-data-table
        :items="store.perguntas"
        :headers="cabecalho"
    >    
        <template v-slot:top>
             <v-row class="mb-1">
                <v-col>
                    <h1 class="bg-white cor1">Perguntas</h1>
                </v-col>
                <v-col class="text-right">
                    <v-btn prepend-icon="mdi-plus" class="bg-cor4" @click="$router.push({ path: '/pesquisas-cadastradas/add-pergunta' })">Adicionar Pergunta</v-btn>
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
</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const router = useRouter();
    const store = useCadastroPesquisaStore();
    const cabecalho = [
        { title: "", align: "start", key: "botoes"},
        { title: "ID", align: "start", key: "num_ordem"},
        { title: "Descrição", align: "start", key: "descricao"},
        // { title: "Ordem", align: "start", key: "num_ordem"},
    ];

    const editar = id => {
        router.push({ path: `/pesquisas-cadastradas/editar-pergunta/${id}` });
    }

    const excluir = id => {
        let indexPerg = null;
        store.perguntas.forEach((perg, index) => {
            if (perg.id == id) indexPerg = index
        });

        if (indexPerg != null) store.perguntas.splice(indexPerg, 1);

        store.perguntas.forEach((perg, index) => perg.num_ordem = index + 1);
    }

</script>