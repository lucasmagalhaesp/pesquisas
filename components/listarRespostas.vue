<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="8">
                    <v-textarea v-model="resposta" rows="2" label="Adicionar resposta:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto"></v-textarea>
                </v-col>
                <v-col cols="12" md="4" class="text-center">
                    <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-content-save" color="success" @click="addResposta">{{ idResposta == null ? "Salvar Resposta" : "Atualizar Resposta" }}</v-btn>
                </v-col>
            </v-row>
        </v-form>
        
        <v-data-table
            :items="store.respostas"
            :headers="cabecalho"
            class="mt-5"
        >    
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col>
                        <h1 class="bg-white cor1 text-h6">Respostas</h1>
                    </v-col>
                    <!-- <v-col class="text-right">
                        <v-btn class="bg-cor4" @click="addResposta">Adicionar Resposta</v-btn>
                    </v-col> -->
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
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    const store = useCadastroPesquisaStore();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const cabecalho = [
        { title: "", align: "start", key: "botoes"},
        { title: "ID", align: "start", key: "num_ordem"},
        { title: "Descrição", align: "start", key: "descricao"},
        // { title: "Ordem", align: "start", key: "num_ordem"},
    ];

    let idResposta = ref(null);
    let resposta = ref("");

    const addResposta = () => {
        if ([null, undefined, ""].includes(resposta.value)) return false;
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