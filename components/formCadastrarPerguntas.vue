<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="12">
                    <v-textarea rows="2" v-model="descricao" label="Descrição:" :density="display.xs ? 'default' : 'compact'"></v-textarea>
                </v-col>
                <!-- <v-col cols="12" md="4">
                    <v-select
                        label="Ordem da Pergunta:"
                        :items="[1, 2, 3, 4]"
                        v-model="numOrdem"
                    />
                </v-col> -->
            </v-row>
            <v-row class="align-center justify-center ga-4 px-3 mb-3">
                <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-content-save" color="success" @click="salvarPergunta">Salvar</v-btn>
                <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-cancel" color="error" @click="cancelar">Cancelar</v-btn>
            </v-row>
           <!--  <v-row>
                <v-col class="gutter-sm">
                    <v-btn prepend-icon="mdi-content-save" color="success" @click="salvarPergunta">Salvar</v-btn>
                    <v-btn prepend-icon="mdi-cancel" color="error" @click="cancelar">Cancelar</v-btn>
                </v-col>
            </v-row> -->
        </v-form>
    </div>
</template>

<script setup>
    import { ref, reactive } from "vue"
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    const route = useRoute();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    let descricao = ref("");
    let numOrdem = ref(2);
    const idPergunta = route.params.id ?? null;

    const props = defineProps(["editar"]);
    
    if (idPergunta != null) descricao.value = store.getPergunta(idPergunta);

    const salvarPergunta = () => {
        store.addPergunta(idPergunta, descricao);
        router.push({ path: "/pesquisas-cadastradas/criar" });
    }

    const cancelar = () => {
        store.cancelarPergunta();
        router.push({ path: "/pesquisas-cadastradas/criar" });
    }

</script>
