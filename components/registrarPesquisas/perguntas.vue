<template>
    <div>
      <v-row>
        <v-col>
          <v-select
              label="Selecionar Pesquisa:"
              :items="pesquisas.data"
              v-model="store.pesquisa_id"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-window v-model="step">
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

        </v-col>
      </v-row>
      <v-card class="mx-auto">
    <!-- <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title> -->

    
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

  </div>
</template>

<script setup>
  import { usePesquisasRealizadas } from "@/stores/pesquisasRealizadas"
  import { ref, reactive, watch } from 'vue'
  
  const store = usePesquisasRealizadas();
  let step = ref(1);
  let pesquisas = reactive({ data: [] });
  let perguntas = reactive({ data: [] });

  async function getDados(){
    let resposta = await $fetch(`http://localhost:8000/api/pesquisas`);
    pesquisas.data = resposta.dados.map(pesq => pesq.id);
  }

  async function getDadosPesquisa(){
    let resposta = await $fetch(`http://localhost:8000/api/pesquisas/${store.pesquisa_id}`);
    perguntas.data = resposta.dados.perguntas;
    store.initPerguntasRespostas(perguntas.data);
  }

  watch(() => store.pesquisa_id, (val,oldVal) => getDadosPesquisa());
  
  getDados();
  getDadosPesquisa();

</script>