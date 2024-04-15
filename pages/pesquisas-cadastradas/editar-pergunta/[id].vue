<template>
    <v-container>
        <v-row>
            <v-col>
                <form-cadastrar-perguntas :editar="true" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <listar-respostas />
            </v-col>
        </v-row>
    </v-container>
</template>