<template>
    
    <v-container>
        <v-row class="justify-center align-center" style="height: 70vh">
            <v-col cols="12" md="4">
                <v-btn color="primary" variant="outlined" style="width: 100%" size="x-large" stacked @click="$router.push({ path: '/usuarios' })">Usuários</v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn color="primary" variant="outlined" style="width: 100%" size="x-large" stacked @click="$router.push({ path: '/pesquisas-cadastradas' })">Pesquisas Cadastradas</v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn color="primary" variant="outlined" style="width: 100%" size="x-large" stacked @click="$router.push({ path: '/pesquisas-realizadas' })">Pesquisas Realizadas</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const router = useRouter()
    import { useGeralStore } from "@/stores/geral"
    const store = useGeralStore();
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
    // console.log(store.dadosUsuario.perfil_usuario_id);
</script>