<template>
    <v-container>
        <v-row>
            <v-col>
                <form-cadastrar-usuarios />
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
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();

    const salvar = () => {
        store.salvarUsuario()
        .then(() => {
            router.push({ path: "/usuarios" });
            store.limparDados();
        })
        .catch(() => alert("Erro ao salvar pesquisa"));
    }

    const cancelar = () => {
        store.limparDados();
        router.push({ path: "/usuarios" });
    }
</script>