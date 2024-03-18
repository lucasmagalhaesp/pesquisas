<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="4">
                    <v-textarea v-model="resposta" rows="2" label="Adicionar resposta:"></v-textarea>
                </v-col>
                <v-col cols="12" md="3">
                    <v-btn color="info" @click="addResposta">{{ idResposta == null ? "Adicionar Resposta" : "Atualizar Resposta" }}</v-btn>
                </v-col>
            </v-row>
        </v-form>
        
        <v-data-table
            :items="store.respostas"
            :headers="cabecalho"
        >    
            <template v-slot:top>
                <h1 class="text-center bg-primary">Respostas</h1>
            </template>
            <template v-slot:item.botoes="{ item }">
                <v-btn rounded="0" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)" />
                <v-btn rounded="sm" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)" />
            </template>
        </v-data-table>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    const store = useCadastroPesquisaStore();
    const cabecalho = [
        { title: "", align: "start", key: "botoes"},
        { title: "ID", align: "start", key: "num_ordem"},
        { title: "Descrição", align: "start", key: "descricao"},
        // { title: "Ordem", align: "start", key: "num_ordem"},
    ];

    let idResposta = ref(null);
    let resposta = ref("");

    const addResposta = () => {
        store.addResposta(idResposta.value, resposta.value);
        resposta.value = "";
        idResposta.value = null;
    }

    const editar = id => {
        let dadosResposta = store.respostas.find(resp => resp.id == id);
        if (dadosResposta != undefined) {
            resposta.value = dadosResposta.descricao;
            idResposta.value = id;
        }
    }

    const excluir = id => {
        let indexResp = null;
        store.respostas.forEach((resp, index) => {
            if (resp.id == id) indexResp = index
        });

        if (indexResp != null) store.respostas.splice(indexResp, 1);

        store.respostas.forEach((resp, index) => resp.num_ordem = index + 1);
    }

</script>