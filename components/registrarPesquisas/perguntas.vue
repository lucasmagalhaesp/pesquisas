<template>
    <div>
      <v-row>
        <v-col cols="12" md="5">
          <v-row>
            <v-col v-if="tipoEntrevistado == 'C'" cols="12">
                <v-text-field v-model="store.nome" label="Nome:" density="compact" />
            </v-col>
            <v-col v-if="tipoEntrevistado == 'C'" cols="12">
                <v-text-field v-model="store.email" label="E-mail:" density="compact" />
            </v-col>
            <v-col>
              <v-select
                  label="Selecionar Pesquisa:"
                  :items="pesquisas.data"
                  v-model="store.pesquisa_id"
                  density="compact"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7">
          <v-row>
            <v-col>
              <v-window v-model="step" class="bg-cor6">
                <v-window-item :value="step">
                  <v-card-text v-if="perguntas.data.length">
                    {{ perguntas.data[step-1].descricao }}
                  </v-card-text>
                  <v-card-text v-if="perguntas.data.length">
                    <v-radio-group v-model="store.perguntas_respostas[step-1].resposta_id">
                      <v-radio v-for="resposta in perguntas.data[step-1].respostas" :label="resposta.descricao" :value="resposta.id" :key="resposta.id"></v-radio>
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
                v-if="step > 1"
                variant="text"
                @click="step--"
              >
                Voltar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="step < perguntas.data.length"
                color="primary"
                variant="flat"
                @click="step++"
              >
                Avançar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

  </div>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue'
  import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
  
  const store = usePesquisasRealizadas();
  let step = ref(1);
  let pesquisas = reactive({ data: [] });
  let perguntas = reactive({ data: [] });
  let carregandoPesq = ref(false);
  let tipoEntrevistado = ref("A");

  async function getDados(){
    let resposta = await $fetch(`http://localhost:8000/api/pesquisas`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
    pesquisas.data = resposta.dados.filter(pesq => pesq.ativa == "S").map(pesq => {
      return { title: pesq.titulo, value: pesq.id }
    });
  }

  async function getDadosPesquisa(){
    carregandoPesq.value = true;
    let resposta = await $fetch(`http://localhost:8000/api/pesquisas/${store.pesquisa_id}`, {
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