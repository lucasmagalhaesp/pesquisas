<template>
    <v-container>
        <v-row>
            <v-col>
                <h2>Registrar Pesquisa</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <registrar-pesquisas-dados-usuario />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <registrar-pesquisas-perguntas />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="gutter-sm">
                <v-btn color="success" @click="salvar">Salvar</v-btn>
                <v-btn color="error" @click="cancelar">Cancelar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    const store = usePesquisasRealizadas();
    const router = useRouter();

    const salvar = () => {
        store.salvar()
        .then(() => {
            store.limparDados();
            router.push({ path: "/pesquisas-realizadas" });
        })
        .catch(() => alert("Erro ao salvar pesquisa"));
    }

    const cancelar = () => {
        store.limparDados();
        router.push({ path: "/pesquisas-realizadas" });
    }

</script>
