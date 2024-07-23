<template>
    
    <v-container>
        <v-row class="justify-center align-center" :style="display.xs ? '' : 'height: 70vh'">
            <v-col cols="12" md="4">
                <v-card variant="outlined" class="cor2">
                    <v-card-text class="text-center">
                        <img src="/imagens/usuarios.png" alt="" style="max-height: 200px">
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="bg-cor3" style="width: 100%" size="large" @click="$router.push({ path: '/usuarios' })">Usuários</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card variant="outlined" class="cor2">
                    <v-card-text class="text-center">
                        <img src="/imagens/pesquisas-cadastradas.png" alt="" style="max-height: 200px">
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="bg-cor3" style="width: 100%" size="large" @click="$router.push({ path: '/pesquisas-cadastradas' })">Pesquisas Cadastradas</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card variant="outlined" class="cor2">
                    <v-card-text class="text-center">
                        <img src="/imagens/pesquisas-realizadas.png" alt="" style="max-height: 200px">
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="bg-cor3" style="width: 100%" size="large" @click="$router.push({ path: '/pesquisas-realizadas' })">Pesquisas Realizadas</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const router = useRouter()
    import { useGeralStore } from "@/stores/geral"
    const store = useGeralStore();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
    // console.log(store.dadosUsuario.perfil_usuario_id);
</script>