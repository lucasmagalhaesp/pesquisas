<template>
    <v-form>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="store.titulo" label="Título:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea rows="2" v-model="store.descricao" label="Descrição:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto"></v-textarea>
            </v-col>
            <v-col cols="12">
                <p>Tipo de usuário entrevistado:</p>
                <v-radio-group v-model="store.tipo_entrevistado" color="#0d8aa6" hide-details="auto">
                    <v-radio label="Anônimo" value="A"></v-radio>
                    <v-radio label="Cadastrado" value="C"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="4">
                <p>Ativa?</p>
                <v-radio-group v-model="store.ativa" inline color="#0d8aa6" hide-details="auto" :density="display.xs ? 'default' : 'compact'">
                    <v-radio label="Sim" value="S"></v-radio>
                    <v-radio label="Não" value="N"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    store.respostas = [];
</script>