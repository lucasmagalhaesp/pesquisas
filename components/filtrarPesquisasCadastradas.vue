<template>
    <v-dialog max-width="700" v-model="abrirModal">
        <v-card>
            <v-card-title class="bg-cor2">
                Filtros
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="store.filtros.titulo" label="Título:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="store.filtros.descricao" label="Descrição:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="8">
                        <p>Tipo de Entrevistado:</p>
                        <v-radio-group v-model="store.filtros.tipo_entrevistado" inline color="#0d8aa6" hide-details="auto" :density="display.xs ? 'default' : 'compact'">
                            <v-radio label="Anônimo" value="A"></v-radio>
                            <v-radio label="Cadastrado" value="C"></v-radio>
                            <v-radio label="Todos" value="T"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="4">
                        <p>Ativa?</p>
                        <v-radio-group v-model="store.filtros.ativa" inline color="#0d8aa6" hide-details="auto" :density="display.xs ? 'default' : 'compact'">
                            <v-radio label="Sim" value="S"></v-radio>
                            <v-radio label="Não" value="N"></v-radio>
                            <v-radio label="Todas" value="T"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions class="bg-cor2">
                <v-spacer></v-spacer>
                <v-btn
                    text="Filtrar"
                    @click="filtrar"
                    color="success"
                    variant="flat"
                ></v-btn>
                <v-btn
                    text="Limpar"
                    @click="limpar"
                    color="warning"
                    variant="flat"
                ></v-btn>
                <v-btn
                    text="Fechar"
                    @click="abrirModal = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { watch, ref } from 'vue';
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    import { useDisplay } from 'vuetify';
    const store = useCadastroPesquisaStore();
    const display = ref(useDisplay());

    let abrirModal = ref(false);
    const props = defineProps(["abrirOpcoes"]);
    watch(() => props.abrirOpcoes, (val, oldVal) => abrirModal.value = true)
    const emit = defineEmits(["getDados"])
    const filtrar = () => {
        emit("getDados");
        abrirModal.value = false;
    }
    const limpar = () => {
        store.limparFiltros();
        filtrar();
    }
</script>

<style>

</style>