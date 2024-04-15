<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field label="Nome:" />
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field label="E-mail:" />
        </v-col>
    </v-row>
</template>

<script setup>
    import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
    const store = usePesquisasRealizadas();
</script>