<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field label="Nome:" :density="display.xs ? 'default' : 'compact'" />
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field label="E-mail:" :density="display.xs ? 'default' : 'compact'" />
        </v-col>
    </v-row>
</template>

<script setup>
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    const store = usePesquisasRealizadas();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
</script>