<template>
    <v-form>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="store.titulo" label="Título:"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-textarea rows="2" v-model="store.descricao" label="Descrição:"></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
                <p>Tipo de usuário entrevistado:</p>
                <v-radio-group v-model="store.tipo_entrevistado">
                    <v-radio label="Anônimo" value="A"></v-radio>
                    <v-radio label="Cadastrado" value="C"></v-radio>
                    <!-- <v-radio label="Ambos" value="ambos"></v-radio> -->
                </v-radio-group>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    store.respostas = [];
</script>