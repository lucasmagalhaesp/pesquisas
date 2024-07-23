<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <utilitarios-titulo-pagina titulo="Cadastrar Pesquisa" /> 
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <form-cadastrar-pesquisas />
            </v-col>
            <v-col cols="12" md="8">
                <v-row>
                    <v-col>
                        <listar-perguntas />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="align-center justify-center ga-4 px-3 mb-3">
            <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" prepend-icon="mdi-content-save" color="success" @click="salvar">Salvar</v-btn>
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
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
    const abrirModal = ref(false);
    const msgErro = ref("");

    const salvar = () => {
        store.salvarPesquisa(sessionStorage.getItem("pesquisaTokenUsuario"))
        .then(() => router.push({ path: "/pesquisas-cadastradas" }))
        .catch((error) => {
            if (error.response._data){
                let erros = error.response._data;
                if (typeof erros == "object"){
                    msgErro.value = "<ul class='mx-3'>";
                        for (let err in erros){
                        msgErro.value += `<li>${erros[err]}</li>`;
                        }
                    msgErro.value += "</ul>";
                }else{
                    msgErro.value = erros;
                }
                abrirModal.value = true;
            }
        });
    }

    const cancelar = () => {
        store.cancelarPesquisa();
        router.push({ path: "/pesquisas-cadastradas" });
    }
</script>
