<template>
    <v-container>
        <v-row>
            <v-col>
                <form-cadastrar-pesquisas />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="primary" @click="$router.push({ path: '/pesquisas/add-pergunta' })">Adicionar Pergunta</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <listar-perguntas />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="success" @click="salvar">Salvar</v-btn>
                <v-btn color="error" @click="cancelar">Cancelar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();

    const salvar = () => {
        store.salvarPesquisa()
        .then(() => router.push({ path: "/pesquisas" }))
        .catch(() => alert("Erro ao salvar pesquisa"));
    }

    const cancelar = () => {
        store.cancelarPesquisa();
        router.push({ path: "/pesquisas" });
    }
</script>
