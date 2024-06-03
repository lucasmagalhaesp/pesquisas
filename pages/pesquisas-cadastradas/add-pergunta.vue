<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="8">
                <!-- <form-cadastrar-perguntas :editar="false" /> -->
                <v-form>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea rows="2" v-model="descricao" label="Descrição:" density="compact"></v-textarea>
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
        <v-row>
            <v-col class="d-flex justify-center text-center ga-2">
                <v-btn prepend-icon="mdi-content-save" color="success" @click="salvarPergunta">Salvar</v-btn>
                <v-btn prepend-icon="mdi-cancel" color="error" @click="cancelar">Cancelar</v-btn>
            </v-col>
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