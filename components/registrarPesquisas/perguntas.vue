<template>
      <v-row>
        <v-col cols="12" md="5">
          <v-row>
            <v-col v-if="tipoEntrevistado == 'C'" cols="12">
                <p>Nessa pesquisa é necessário informar o nome e o e-mail do entrevistado:</p>
            </v-col>
            <v-col v-if="tipoEntrevistado == 'C'" cols="12">
                <v-text-field v-model="store.nome" label="Nome:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
            </v-col>
            <v-col v-if="tipoEntrevistado == 'C'" cols="12">
                <v-text-field v-model="store.email" label="E-mail:" :density="display.xs ? 'default' : 'compact'" color="#0d8aa6" hide-details="auto" />
            </v-col>
            <v-col>
              <v-select
                  label="Selecionar Pesquisa:"
                  :items="pesquisas.data"
                  v-model="store.pesquisa_id"
                  :density="display.xs ? 'default' : 'compact'"
                  color="#0d8aa6" hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7">
          <v-row>
            <v-col>
              <v-window v-model="store.numPergunta" class="bg-cor6">
                <v-window-item :value="store.numPergunta">
                  <v-card-title class="text-center bg-cor3">
                    Pergunta {{ store.numPergunta }} / {{ perguntas.data.length }}
                  </v-card-title>
                  <v-card-text class="mt-md-3" v-if="perguntas.data.length && store.perguntas_respostas.length">
                    {{ perguntas.data[store.numPergunta-1].descricao }}
                  </v-card-text>
                  <v-card-text v-if="perguntas.data.length && store.perguntas_respostas.length > 0">
                    <v-radio-group v-model="store.perguntas_respostas[store.numPergunta-1].resposta_id" color="#0d8aa6" hide-details="auto">
                      <v-radio v-for="resposta in perguntas.data[store.numPergunta-1].respostas" :label="resposta.descricao" :value="resposta.id" :key="resposta.id"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-window-item>
              </v-window>
            <v-overlay
                :model-value="carregandoPesq"
                class="align-center justify-center"
                >
                <v-progress-circular
                    color="primary"
                    size="64"
                    indeterminate
                ></v-progress-circular>
            </v-overlay>
            </v-col>
          </v-row>
          <v-card class="mx-auto bg-cor3">
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                v-if="store.numPergunta > 1"
                variant="text"
                @click="store.numPergunta--"
              >
                Voltar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="store.numPergunta < perguntas.data.length"
                color="primary"
                variant="flat"
                @click="store.numPergunta++"
              >
                Avançar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue'
  const config = useRuntimeConfig();
  import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
  import { useDisplay } from 'vuetify';
  const display = ref(useDisplay());
  
  const store = usePesquisasRealizadas();
  // let store.numPergunta = ref(1);
  let pesquisas = reactive({ data: [] });
  let perguntas = reactive({ data: [] });
  let carregandoPesq = ref(false);
  let tipoEntrevistado = ref("A");

  async function getDados(){
    let resposta = await $fetch(`${config.public.API_PATH}pesquisas`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
    pesquisas.data = resposta.dados.filter(pesq => pesq.ativa == "S").map(pesq => {
      return { title: pesq.titulo, value: pesq.id }
    });
  }

  async function getDadosPesquisa(){
    carregandoPesq.value = true;
    let resposta = await $fetch(`${config.public.API_PATH}pesquisas/${store.pesquisa_id}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        }
    );
    carregandoPesq.value = false;
    tipoEntrevistado.value = resposta.dados.tipo_entrevistado;
    perguntas.data = resposta.dados.perguntas;
    store.initPerguntasRespostas(perguntas.data);
  }

  watch(() => store.pesquisa_id, (val,oldVal) => getDadosPesquisa());
  
  getDados();
  getDadosPesquisa();

</script>