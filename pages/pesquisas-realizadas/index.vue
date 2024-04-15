<template>
    <v-container>
        <v-row>
            <v-col class="text-right">
                <v-btn color="primary" @click="$router.push({ path: '/pesquisas-realizadas/registrar' })">Registrar Pesquisa</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <listar-pesquisas-realizadas />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const router = useRouter()
</script>
