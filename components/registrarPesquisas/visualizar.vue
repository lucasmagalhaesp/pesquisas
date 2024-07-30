<template>
    <v-row v-if="dadosPesquisa.dados != null">
        <v-col cols="12" class="text-center text-h5 font-weight-bold cor1">
            Dados da Pesquisa
        </v-col>
        <v-col cols="12" md="2">
            <strong>Data: </strong> {{ dadosPesquisa.dados.created_at }}
        </v-col>
        <v-col cols="12" md="5">
            <strong>Pesquisa:</strong> {{ dadosPesquisa.dados.pesquisa.titulo }}
        </v-col>
        <v-col cols="12" md="5">
            <strong>Nome do Agente:</strong> {{ dadosPesquisa.dados.agente.nome }}
        </v-col>
        <v-col cols="12" md="4">
            <strong>Tipo do entrevistado:</strong> {{ dadosPesquisa.dados.pesquisa.tipo_entrevistado == "A" ? "Anônimo" : "Cadastrado" }}
        </v-col>
        <v-col v-if="dadosPesquisa.dados.pesquisa.tipo_entrevistado == 'C'" cols="12" md="8">
            <strong>Nome do entrevistado:</strong> {{ dadosPesquisa.dados.entrevistado.nome }}
        </v-col>
    </v-row>
    <hr class="my-4" />
    <v-row v-if="![null, undefined].includes(perguntas)">
        <v-col cols="12" class="text-center text-h5 font-weight-bold cor1">
            Perguntas
        </v-col>
        <v-col cols="12" md="6" v-for="(perg, index) in perguntas.data" :key="index">
            <h3>{{ index + 1 }} - {{ perg.pergunta }}</h3>
            <p>R: {{ perg.resposta }}</p>
        </v-col>
        <v-overlay
            :model-value="carregando"
            class="align-center justify-center"
            >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
    </v-row>
    <v-row>
        <v-col>
            <v-btn prepend-icon="mdi-arrow-left" class="bg-cor5" @click="router.push({ path: `/pesquisas-realizadas` })">Voltar</v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    let dadosPesquisa = reactive({dados: null});
    let perguntas = reactive({ data:[] });
    const idPesquisa = route.params.id ?? null;
    let carregando = ref(false);
    async function getDados(){
        carregando.value = true;
        let pesquisas = await $fetch(`${config.public.API_PATH}pesquisasRealizadas/visualizar/${idPesquisa}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        
        dadosPesquisa.dados = pesquisas.pesquisa.dados;
        perguntas.data = pesquisas.pesquisa.listaPerguntas;

        carregando.value = false;

    }

    getDados();
</script>

<style>

</style>