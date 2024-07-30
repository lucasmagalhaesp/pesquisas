<template>
    <v-data-table
        :items="store.perguntas"
        :headers="cabecalho"
        no-data-text="Nenhum registro encontrado"
        loading-text="Carregando..."
    >    
        <template v-slot:top>
             <v-row class="mb-1">
                <v-col>
                    <h1 class="bg-white cor1 text-h6">Perguntas</h1>
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
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Confirmação" class="bg-error">
            <v-card-text>
                Confirma a exclusão dessa pergunta?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="SIM"
                    @click="excluirPergunta"
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
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const router = useRouter();
    const store = useCadastroPesquisaStore();
    const cabecalho = [
        { title: "", align: "start", key: "botoes"},
        { title: "ID", align: "start", key: "num_ordem"},
        { title: "Descrição", align: "start", key: "descricao"},
        // { title: "Ordem", align: "start", key: "num_ordem"},
    ];

    let abrirModal = ref(false);
    let idExclusao = ref(null);

    const editar = id => {
        router.push({ path: `/pesquisas-cadastradas/editar-pergunta/${id}` });
    }

    const excluir = id => {
        abrirModal.value = true;
        idExclusao.value = id;
    }

    const excluirPergunta = () => {
        let indexPerg = null;
        store.perguntas.forEach((perg, index) => {
            if (perg.id == idExclusao.value) indexPerg = index
        });

        if (indexPerg != null) store.perguntas.splice(indexPerg, 1);

        store.perguntas.forEach((perg, index) => perg.num_ordem = index + 1);
        abrirModal.value = false;
    }

</script>