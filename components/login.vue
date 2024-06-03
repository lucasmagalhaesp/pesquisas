<template>
    <v-row class="justify-center">
        <v-col cols="12" md="6">
            <v-card class="pa-5" variant="outlined">
                <v-form>
                    <v-row class="my-3 justify-center">
                        <v-col class="text-center" style="font-size: 50px">
                            <v-icon icon="mdi-note-search-outline"></v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="login.email" label="E-mail:" @keyup.enter="entrar"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field rows="2" type="password" v-model="login.senha" label="Senha:" @keyup.enter="entrar"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="text-right">
                            <v-btn color="success" @click="entrar">Entrar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
    import { useGeralStore } from "@/stores/geral"
    const store = useGeralStore();
    const router = useRouter();
    const login = reactive({ email: "", senha: "" });

    const entrar = () => {
        $fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            credentials: "same-origin",
            body: {
                dados: login
            }
        })
        .then(resposta => {
            if (resposta.sucesso){
                console.log(resposta);
                sessionStorage.setItem("pesquisaTokenUsuario", resposta.token);
                store.login(resposta);
                router.push({ path: "/" });
            }else{
                alert(resposta.msg);
            }
        })
        .catch(erro => alert("E-mail e/ou senha incorretos"));
    }

</script>
