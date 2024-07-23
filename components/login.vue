<template>
    <v-card variant="outlined" color="primary">
        <v-card-title class="text-center text-h5 bg-cor2">
            Login
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-row class="my-3 justify-center">
                    <v-col cols="12" md="5" class="text-center">
                        <img src="/imagens/principal.png" alt="" style="max-height: 200px">
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="login.email" label="E-mail:" @keyup.enter="entrar" color="#0d8aa6" hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field rows="2" type="password" v-model="login.senha" label="Senha:" @keyup.enter="entrar" color="#0d8aa6" hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" color="success" @click="entrar">Entrar</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
    <v-overlay
        :model-value="validando"
        class="align-center justify-center"
        >
        <v-progress-circular
            color="primary"
            size="64"
            indeterminate
        ></v-progress-circular>
    </v-overlay>
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
    import { useGeralStore } from "@/stores/geral"
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const store = useGeralStore();
    const router = useRouter();
    const login = reactive({ email: "", senha: "" });
    let validando = ref(false);
    let abrirModal = ref(false);
    let msgErro = ref("");

    const entrar = () => {
        validando.value = true;
        $fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            credentials: "same-origin",
            body: {
                dados: login
            }
        })
        .then(resposta => {
            if (resposta.sucesso){
                sessionStorage.setItem("pesquisaTokenUsuario", resposta.token);
                store.login(resposta);
                router.push({ path: "/" });
            }else{
                alert(resposta.msg);
            }
        })
        .catch(erro => {
            msgErro.value = "E-mail e/ou senha incorretos";
            abrirModal.value = true;
        })
        .then(() => validando.value = false);
    }

</script>
