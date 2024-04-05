<template>
    <v-form>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="store.nome" label="Nome:" />
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field v-model="store.email" label="E-mail:" />
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field v-model="store.senha" type="password" label="Senha:" />
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field v-model="store.confirmar_senha" type="password" label="Confirmar Senha:" />
            </v-col>
            <v-col cols="12" md="6">
                <p>Perfil do Usuário:</p>
                <v-radio-group v-model="store.perfil_usuario_id">
                    <v-radio label="Administrador" value="1"></v-radio>
                    <v-radio label="Agente" value="2"></v-radio>
                    <v-radio label="Entrevistado" value="3"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="6">
                <p>Ativo?</p>
                <v-radio-group v-model="store.ativo">
                    <v-radio label="Sim" value="S"></v-radio>
                    <v-radio label="Não" value="N"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();
</script>