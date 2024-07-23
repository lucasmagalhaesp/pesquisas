<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <utilitarios-titulo-pagina titulo="Registrar Pesquisa" /> 
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <registrar-pesquisas-perguntas />
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
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    const store = usePesquisasRealizadas();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    let abrirModal = ref(false);
    let msgErro = ref("");
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });

    const salvar = () => {
        store.salvar(sessionStorage.getItem("pesquisaTokenUsuario"))
        .then(() => {
            store.limparDados();
            router.push({ path: "/pesquisas-realizadas" });
        })
        .catch(error => {
            msgErro.value = error.response._data;
            abrirModal.value = true;
        });
    }

    const cancelar = () => {
        store.limparDados();
        router.push({ path: "/pesquisas-realizadas" });
    }

</script>
