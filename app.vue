<template>
  <div>
    <v-app>
        <v-layout>
      <!-- <v-card> -->
          <v-app-bar
            color="primary"
            prominent
            :style="display.xs ? 'padding: 0 20px' : 'padding: 0 80px'"
          >
            <v-app-bar-nav-icon v-if="store.logado && store.perfilUsuario == 'ADMIN'" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Pesquisas de Opinião</v-toolbar-title>

            <v-spacer v-if="!display.xs"></v-spacer>

            <!-- <template v-if="$vuetify.display.mdAndUp">
              <v-btn icon="mdi-magnify" variant="text"></v-btn>

              <v-btn icon="mdi-filter" variant="text"></v-btn>
            </template> -->

            <v-btn v-if="store.logado && !display.xs" size="small" color="red-darken-4" variant="flat" @click="abrirModal = true">Sair</v-btn>
          </v-app-bar>

          <v-navigation-drawer
            v-model="drawer"
            temporary
          >
            <v-list>
              <v-list-item class="cor1" v-for="item in items" :key="item.value" @click="$router.push({ path: `/${item.value}` })">{{ item.title }}</v-list-item>
              <v-list-item class="text-error" @click="abrirModal = true">Sair</v-list-item>
            </v-list>
          </v-navigation-drawer>

          <!-- <v-main style="height: 500px;">
            <v-card-text>
              The navigation drawer will appear from the bottom on smaller size screens.
            </v-card-text>
          </v-main> -->
    <!-- </v-card> -->
    <!-- <NuxtWelcome /> -->
    
    <v-main>
        <div class="mt-2">
          <NuxtPage />
        </div>
    </v-main>
        </v-layout>
    <v-footer class="bg-secondary" style="max-height: 50px; padding: 20px 80px">
      <v-row class="justify-center">
        <v-col v-if="store.logado" class="text-center">
          Usuário: {{ store.getDadosUsuario.nome }}
        </v-col>
      </v-row>
    </v-footer>
    </v-app>
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Confirmação" class="bg-error">
            <v-card-text>
                Deseja realmente sair do sistema?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="SIM"
                    @click="logout"
                    color="default"
                    text-color="error"
                    variant="flat"
                ></v-btn>
                <v-btn
                    text="NÃO"
                    @click="abrirModal = false"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
    import "~/assets/css/app.css"
    import { watch, ref } from "vue"
    import { useGeralStore } from "@/stores/geral"
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const store = useGeralStore();
    const router = useRouter();
    const drawer = ref(false);
    const group = ref(null);
    let abrirModal = ref(false);
    const items = [
        {
            title: 'Home',
            value: '',
        },
        {
            title: 'Usuários',
            value: 'usuarios',
        },
        {
            title: 'Pesquisas Cadastradas',
            value: 'pesquisas-cadastradas',
        },
        {
            title: 'Pesquisas Realizadas',
            value: 'pesquisas-realizadas',
        },
        {
            title: 'Dashboard',
            value: 'dashboard',
        }
    ];

    watch(() => group, (val, oldVal) => drawer.value = false)

    const logout = () => {
      abrirModal.value = false;
      const config = useRuntimeConfig();
      $fetch(`${config.public.API_PATH}auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
      })
      .then(resposta => {
          if (resposta.sucesso){
              sessionStorage.removeItem("pesquisaTokenUsuario");
              store.logout();
              router.push({ path: "/login" });
          }
      })
      .catch(erro => console.error(erro));
    }
</script>

<style scoped>
  header{
    background-color: #2da3bc !important;
    color: #FFF !important;
  }
  footer{
    background-color: #0d8aa6 !important;
    color: #FFF !important;
  }
</style>