<template>
    <v-dialog max-width="700" v-model="abrirModal">
        <v-card>
            <v-card-title class="bg-cor2">
                Filtros
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="store.filtros.nome" label="Nome:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="store.filtros.email" label="E-mail:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="8">
                        <p>Perfil do Usuário:</p>
                        <v-radio-group v-model="store.filtros.perfil_usuario_id" inline color="#0d8aa6" hide-details="auto" :density="display.xs ? 'default' : 'compact'">
                            <v-radio label="Administrador" :value="1"></v-radio>
                            <v-radio label="Agente" :value="2"></v-radio>
                            <v-radio label="Entrevistado" :value="3"></v-radio>
                            <v-radio label="Todos" :value="0"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="4">
                        <p>Ativo?</p>
                        <v-radio-group v-model="store.filtros.ativo" inline color="#0d8aa6" hide-details="auto" :density="display.xs ? 'default' : 'compact'">
                            <v-radio label="Sim" value="S"></v-radio>
                            <v-radio label="Não" value="N"></v-radio>
                            <v-radio label="Todos" value="T"></v-radio>
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
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    import { useDisplay } from 'vuetify';
    const store = useCadastroUsuarioStore();
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