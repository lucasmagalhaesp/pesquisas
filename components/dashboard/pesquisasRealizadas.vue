<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-card variant="outlined" class="cor2">
                <v-card-title class="text-center bg-cor3">
                    Pesquisas Realizadas
                </v-card-title>
                <v-card-text class="text-center">
                    <v-chip color="cor1" size="x-large">{{ store.dadosGerais.pesquisasRealizadas }}</v-chip>
                </v-card-text>
            </v-card>
        </v-col>
        
        <v-col cols="12" md="8">
            <Doughnut
                id="my-chart-id"
                :options="chartOptions"
                :data="{
                    labels,
                    datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: numPesquisas
                    }
                    ]
                }"
            />
        </v-col>
    </v-row>
    <v-divider class="mt-3" />
    <v-row class="mt-5">
        <dashboard-detalhar-perguntas />
    </v-row>
</template>

<script setup>
    const config = useRuntimeConfig();
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'
    import { useDashboardStore } from "@/stores/dashboard"
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const store = useDashboardStore();

    const getDados = async() => {
        let dashboard = await $fetch(`${config.public.API_PATH}dashboard/getPesquisasRealizadas`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        store.pesquisasRealizadas = dashboard;
    }
    getDados();

    ChartJS.register(ArcElement, Tooltip, Legend);

    const labels = computed(() => {
        if (store.pesquisasRealizadas.length == 0) return [];
        return store.pesquisasRealizadas.map(pesq => {
            let primeiroItem = pesq[0];
            return primeiroItem.pesquisa.titulo
        });
    });

    const numPesquisas = computed(() => {
        if (store.pesquisasRealizadas.length == 0) return [];
        return store.pesquisasRealizadas.map(pesq => pesq.length);
    });
    
    let chartOptions = ref({
        plugins: {
            legend: {
                position: 'left'
            }
        },
        
        responsive: true,
        maintainAspectRatio: false,
    });
</script>

<style>

</style>