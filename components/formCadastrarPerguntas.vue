<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12" md="12">
                    <v-textarea rows="2" v-model="descricao" label="Descrição:"></v-textarea>
                </v-col>
                <!-- <v-col cols="12" md="4">
                    <v-select
                        label="Ordem da Pergunta:"
                        :items="[1, 2, 3, 4]"
                        v-model="numOrdem"
                    />
                </v-col> -->
            </v-row>
            <v-row>
                <v-col class="gutter-sm">
                    <v-btn color="success" @click="salvarPergunta">Salvar</v-btn>
                    <v-btn color="error" @click="cancelar">Cancelar</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <!-- <v-row>
            <v-col>
                <v-btn color="primary" @click="$router.push({ path: '/pesquisas/add-pergunta' })">Adicionar Pergunta</v-btn>
            </v-col>
        </v-row> -->
    </div>
</template>

<script setup>
    import { ref, reactive } from "vue"
    import { useCadastroPesquisaStore } from "@/stores/cadastrarPesquisas"
    const store = useCadastroPesquisaStore();
    const router = useRouter();
    const route = useRoute();
    let descricao = ref("");
    let numOrdem = ref(2);
    const idPergunta = route.params.id ?? null;

    const props = defineProps(["editar"]);
    
    if (idPergunta != null) descricao.value = store.getPergunta(idPergunta);

    const salvarPergunta = () => {
        store.addPergunta(idPergunta, descricao);
        router.push({ path: "/pesquisas/criar" });
    }

    const cancelar = () => {
        store.cancelarPergunta();
        router.push({ path: "/pesquisas/criar" });
    }

</script>
