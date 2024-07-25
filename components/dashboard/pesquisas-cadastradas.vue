<template>
    <v-row class="justify-center">
        <v-col cols="12" md="4">
            <v-row>
                <v-col cols="12">
                    <v-card variant="outlined" class="cor2">
                        <v-card-title class="text-center bg-cor3">
                            Pesquisas Ativas
                        </v-card-title>
                        <v-card-text class="text-center">
                            <v-chip color="cor1" size="x-large">{{ store.dadosGerais.pesquisasAtivas }}</v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card variant="outlined" class="cor2">
                        <v-card-title class="text-center bg-cor3">
                            Pesquisas Inativas
                        </v-card-title>
                        <v-card-text class="text-center">
                            <v-chip color="cor1" size="x-large">{{ store.dadosGerais.pesquisasInativas }}</v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="3">
            <Doughnut
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </v-col>
    </v-row>
</template>

<script setup>
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'
    import { useDisplay } from 'vuetify';
    import { useDashboardStore } from "@/stores/dashboard"
    const store = useDashboardStore();

    ChartJS.register(ArcElement, Tooltip, Legend);

    let chartData = ref({
        labels: ['Pesquisas Ativas', 'Pesquisas Inativas'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651'],
            data: [store.dadosGerais.pesquisasAtivas, store.dadosGerais.pesquisasInativas]
            }
        ]
    });

    let chartOptions = ref({
        responsive: true
    });
</script>

<style>

</style>