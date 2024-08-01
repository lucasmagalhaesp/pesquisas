<template>
    <v-dialog max-width="700" v-model="abrirModal">
        <v-card>
            <v-card-title class="bg-cor2">
                Filtros
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-select
                            label="Pesquisa:"
                            :items="pesquisas.data"
                            v-model="store.filtros.pesquisa_id"
                            :density="display.xs ? 'default' : 'compact'"
                            color="#0d8aa6" hide-details="auto"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="Agente:"
                            :items="agentes.data"
                            v-model="store.filtros.usuario_id"
                            :density="display.xs ? 'default' : 'compact'"
                            color="#0d8aa6" hide-details="auto"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="Entrevistado:"
                            :items="entrevistados.data"
                            v-model="store.filtros.entrevistado_id"
                            :density="display.xs ? 'default' : 'compact'"
                            color="#0d8aa6" hide-details="auto"
                        />
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
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    import { useDisplay } from 'vuetify';
    const config = useRuntimeConfig();
    const store = usePesquisasRealizadas();
    const display = ref(useDisplay());

    let abrirModal = ref(false);
    const props = defineProps(["abrirOpcoes"]);
    watch(() => props.abrirOpcoes, (val, oldVal) => abrirModal.value = true)
    const emit = defineEmits(["getDados"])

    let agentes = reactive({data:[]});
    let entrevistados = reactive({data:[]});
    let pesquisas = reactive({data:[]});
    const getUsuarios = async() => {
        let respostas = await $fetch(`${config.public.API_PATH}usuarios/getDados`, {
            method: "POST",
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        const usuarios = respostas.dados;
        agentes.data = usuarios.filter(usuario => [1,2].includes(usuario.perfil_usuario_id)).map(usuario => {
            return { title: usuario.nome, value: usuario.id }
        });

        entrevistados.data = usuarios.filter(usuario => usuario.perfil_usuario_id == 3).map(usuario => {
            return { title: usuario.nome, value: usuario.id }
        });

        entrevistados.data.unshift({ title: "Anônimo", value: 0 });
    }

    const getPesquisas = async() => {
        let resposta = await $fetch(`${config.public.API_PATH}pesquisas/getDados`, {
            method: "POST",
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        pesquisas.data = resposta.dados.map(pesq => {
            return { title: pesq.titulo, value: pesq.id }
        });
    }

    getUsuarios();
    getPesquisas();

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