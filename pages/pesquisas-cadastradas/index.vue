<template>
    <v-container>
        <v-row>
            <v-col class="text-right">
                <v-btn color="primary" @click="$router.push({ path: 'pesquisas-cadastradas/criar' })">Criar Pesquisa</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <listar-pesquisas-cadastradas />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const router = useRouter()
</script>
