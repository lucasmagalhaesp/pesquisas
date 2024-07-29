<template>
    <v-col cols="12">
        <p>Selecione abaixo a pesquisa que você deseja visualizar as estatísticas:</p>
    </v-col>
    <v-col cols="12">
        <v-expansion-panels color="cor3">
            <v-expansion-panel v-for="(pesqR, indexPesq) in store.pesquisasRealizadas" :key="indexPesq">
                <v-expansion-panel-title :focusable="tab = 1">{{ pesqR[0].pesquisa.titulo }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    
                    <v-tabs
                        v-model="tab"
                        align-tabs="center"
                        bg-color="cor1"
                    >
                        <v-tab v-for="(perg, index) in pesqR[0].pesquisa.perguntas" :key="perg.id" :value="index + 1">
                            {{ index + 1 }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="tab" class="pt-3">
                        <v-tabs-window-item  v-for="(perg, index) in pesqR[0].pesquisa.perguntas" :key="perg.id" :value="index + 1">
                            <v-row>
                                <v-col cols="12" class="text-center">
                                    <div class="text-h6">{{ perg.descricao }}</div>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center">
                                <v-col cols="12" md="4">
                                    <v-card variant="outlined" class="cor2">
                                        <v-card-title class="text-center bg-cor3">
                                            Pesquisas Realizadas
                                        </v-card-title>
                                        <v-card-text class="text-center">
                                            <v-chip color="cor1" size="x-large">{{ pesqR.length }}</v-chip>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <Doughnut
                                        id="my-chart-id"
                                        :options="chartOptions"
                                        :data="{
                                            labels: labels(indexPesq, perg.id),
                                            datasets: [
                                            {
                                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#483D8B'],
                                                data: respostasDadas(indexPesq, perg.id)
                                            }
                                            ]
                                        }"
                                    />
                                </v-col>
                            </v-row>

                        </v-tabs-window-item>
                    </v-tabs-window>

                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-col>
</template>

<script setup>
    import { ref, reactive } from "vue"
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'
    import { useDashboardStore } from "@/stores/dashboard"
    const store = useDashboardStore();
    let tab = ref(1);
    let respostas = reactive({data:[]});

    ChartJS.register(ArcElement, Tooltip, Legend);

    let chartOptions = ref({
        plugins: {
            legend: {
                position: 'left'
            }
        },
        
        responsive: true,
        maintainAspectRatio: false,
    });

    const getRespostasDadas = (indexPesq, idPergunta) => {
        return store.pesquisasRealizadas[indexPesq].map(pesq => {
            const pergResp = pesq.perguntas_respostas.find(pr => pr.pergunta_id == idPergunta);
            if (pergResp != undefined) return pergResp.resposta_id;
            else 0;
        });
    }

    const labels = (indexPesq, idPergunta) => {
        const respostasDadas = getRespostasDadas(indexPesq, idPergunta);
        const respostasFiltradas = [...new Set(respostasDadas)];
        const lbl = respostasFiltradas.map(respDada => {
            const resposta = respostas.data.find(resp => resp.id == respDada);
            if (resposta != undefined) return resposta.descricao;
            return null;
        });
        return lbl;
    };

    const respostasDadas = (indexPesq, idPergunta) => {
        const respostasDadas = getRespostasDadas(indexPesq, idPergunta);
        let numRespostas = [];
        respostasDadas.forEach(resp => {
            let r = numRespostas.find(nR => nR.id == resp);
            if (r == undefined) {
                numRespostas.push({
                    id: resp,
                    qtd: 1
                });
            }else{
                numRespostas.forEach(nmR => {
                    if (nmR.id == resp) {
                        nmR.qtd += 1;
                    }
                });
            }

        });
        return numRespostas.map(respostas => respostas.qtd);
    }

    const listarRespostas = async() => {
        let resp = await $fetch('http://localhost:8000/api/dashboard/getRespostas', {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        respostas.data = resp;
    }
    listarRespostas();
</script>

<style>

</style>