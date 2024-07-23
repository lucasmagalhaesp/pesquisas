<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <utilitarios-titulo-pagina titulo="Adicionar Pergunta" /> 
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="8">
                <!-- <form-cadastrar-perguntas :editar="false" /> -->
                <v-form>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea rows="2" v-model="descricao" label="Descrição:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto"></v-textarea>
                        </v-col>
                        <!-- <v-col cols="12" md="4">
                            <v-select
                                label="Ordem da Pergunta:"
                                :items="[1, 2, 3, 4]"
                                v-model="numOrdem"
                            />
                        </v-col> -->
                    </v-row>
                </v-form>
            </v-col>
       <!--  </v-row>
        <v-row> -->
            <v-col cols="12" md="8">
                <listar-respostas />
            </v-col>
        </v-row>
        <v-row class="align-center justify-center ga-4 px-3 mb-3">
            <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-content-save" color="success" @click="salvarPergunta">Salvar</v-btn>
            <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-cancel" color="error" @click="cancelar">Cancelar</v-btn>
        </v-row>
    </v-container>
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Erro" class="bg-error">
            <v-card-text v-html="msgErro"></v-card-text>

            <v-card-actions class="justify-end">
                <v-btn
                    color="default"
                    text-color="error"
                    variant="flat"
                    text="Ok"
                    @click="abrirModal = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, reactive } from "vue"
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    const route = useRoute();
    let descricao = ref("");
    let numOrdem = ref(2);
    const idPergunta = route.params.id ?? null;
    
    let abrirModal = ref(false);
    let msgErro = ref("");

    if (idPergunta != null) descricao.value = store.getPergunta(idPergunta);

    const salvarPergunta = () => {
        if (descricao.value == "" || descricao.value.length < 10){
            msgErro.value = "A pergunta deve ter pelo menos 10 caracteres";
            abrirModal.value = true;
            return false;
        }

        if (store.respostas.length < 2){
            msgErro.value = "É necessário adicionar pelo menos 2 respostas para a pergunta";
            abrirModal.value = true;
            return false;
        }

        store.addPergunta(idPergunta, descricao);
        router.push({ path: "/pesquisas-cadastradas/criar" });
    }

    const cancelar = () => {
        store.cancelarPergunta();
        router.push({ path: "/pesquisas-cadastradas/criar" });
    }

</script>