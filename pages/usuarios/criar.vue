<template>
    <v-container>
        <v-row>
            <v-col class="text-h5 font-weight-bold cor1">Cadastrar Usuário</v-col>
        </v-row>
        <v-row class="align-center justify-center">
            <v-col cols="8">
                <form-cadastrar-usuarios />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-center ga-2">
                <v-btn prepend-icon="mdi-content-save" color="success" @click="salvar">Salvar</v-btn>
                <v-btn prepend-icon="mdi-cancel" color="error" @click="cancelar">Cancelar</v-btn>
            </v-col>
        </v-row>
        <v-overlay
            :model-value="carregando"
            class="align-center justify-center"
            >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
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
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const { lg, sm, xs } = useDisplay();
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
    
    let carregando = ref(false);
    let abrirModal = ref(false);
    let msgErro = ref("");

    const salvar = () => {
        carregando.value = true;
        store.salvarUsuario(sessionStorage.getItem("pesquisaTokenUsuario"))
        .then(() => {
            router.push({ path: "/usuarios" });
            store.limparDados();
        })
        .catch(error => {
            if (error.response._data){
                let erros = error.response._data;
                msgErro.value = "<ul class='mx-3'>";
                    for (let err in erros){
                       msgErro.value += `<li>${erros[err]}</li>`;
                    }
                msgErro.value += "</ul>";
                abrirModal.value = true;
            }
        })
        .then(() => carregando.value = false);
    }

    const cancelar = () => {
        router.push({ path: "/usuarios" });
        store.limparDados();
    }
</script>