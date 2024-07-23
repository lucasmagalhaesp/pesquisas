<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <utilitarios-titulo-pagina titulo="Usuários" /> 
            </v-col>
        </v-row> 
        <v-row>
            <v-col>
                <listar-usuarios />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    const router = useRouter()
    definePageMeta({
        middleware: [
            "auth",
            "permissao"
        ]
    });
</script>
