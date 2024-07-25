<template>
    <v-row class="justify-center">
        <v-col cols="12">
            <v-card>
                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    bg-color="cor3"
                    stacked
                >
                    <v-tab value="tab-usuarios">
                        <v-icon icon="mdi-account-group"></v-icon>
                        Usuários
                    </v-tab>

                    <v-tab value="tab-pesquisas-cadastradas">
                        <v-icon icon="mdi-view-list-outline"></v-icon>
                        Pesquisas Cadastradas
                    </v-tab>

                    <v-tab value="tab-pesquisas-realizadas">
                        <v-icon icon="mdi-format-list-checks"></v-icon>
                        Pesquisas Realizadas
                    </v-tab>
                </v-tabs>

                <v-tabs-window v-model="tab"class="pt-3">
                    <v-tabs-window-item value="tab-usuarios">
                        <v-card>
                            <v-card-text>
                                <dashboard-usuarios />
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="tab-pesquisas-cadastradas">
                        <v-card>
                            <v-card-text>
                                <dashboard-pesquisas-cadastradas />
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="tab-pesquisas-realizadas">
                        <v-card>
                            <v-card-text>
                                <dashboard-pesquisas-realizadas />
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import { useDisplay } from 'vuetify';
    import { useDashboardStore } from "@/stores/dashboard"
    const store = useDashboardStore();
    const display = ref(useDisplay());
    let tab = ref("tab-usuarios");
    const getDados = async() => {
        let dashboard = await $fetch('http://localhost:8000/api/dashboard', {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        store.setDadosGerais(dashboard.dados);
    }
    getDados();
</script>

<style>
    .v-chip{
        margin-top: 20px
    }
    .v-chip__content{
        font-size: 2rem;
    }
</style>