<template>
    <div>
        <v-btn v-if="display.xs" :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor4 mb-3" prepend-icon="mdi-plus" rounded="sm" @click="$router.push({ path: 'usuarios/criar' })">Novo Usuário </v-btn>
        <v-data-table
            v-if="!display.xs"
            :items="dadosUsuarios.data"
            :headers="cabecalho"
            no-data-text="Nenhum registro encontrado"
            loading-text="Carregando..."
            :loading="carregando"
        >
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col class="text-right">
                        <v-btn :block="display.xs" :size="display.xs ? 'large' : 'default'" class="bg-cor4" prepend-icon="mdi-plus" rounded="sm" @click="$router.push({ path: 'usuarios/criar' })">Novo Usuário </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:item.botoes="{ item }">
                <v-btn rounded="0" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)" />
                <v-btn rounded="sm" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)" />
            </template>
            <template v-slot:headers="{ columns }">
                <tr class="bg-cor3">
                    <template v-for="column in columns" :key="column.key">
                        <th>{{ column.title }}</th>
                    </template>
                </tr>
            </template>
        </v-data-table>

        <v-data-iterator v-else :items="dadosUsuarios.data" :page="page" :items-per-page="itemsPerPage">
            <template v-slot:default="{ items }">
                <template
                    v-for="(item, i) in usuariosFiltrados.data"
                    :key="i"
                >
                    <!-- <v-card v-bind="item.raw"></v-card> -->
                    <v-card>
                        <v-card-title class="bg-cor3">
                            <strong>Nome:</strong> {{ item.nome.split(" ")[0] }}
                        </v-card-title>
                        <v-card-text class="pt-3 bg-cor6">
                            <div>
                                <strong>Código:</strong> {{ item.id }}
                            </div>
                            <div>
                                <strong>Nome completo:</strong> {{ item.nome }}
                            </div>
                            <div>
                                <strong>Perfil:</strong> {{ item.perfil_usuario.nome }}
                            </div>
                            <div>
                                <strong>E-mail:</strong> {{ item.email }}
                            </div>
                            <div>
                                <strong>Data de cadastro:</strong> {{ item.created_at }}
                            </div>
                            <div>
                                <strong>Ativo:</strong> {{ item.ativo == "S" ? "Sim" : "Não" }}
                            </div>
                        </v-card-text>
                        <v-row class="justify-center bg-cor6 ga-4 px-3 py-3">
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)">Editar</v-btn>
                            <v-btn rounded="sm" :block="display.xs" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)">Excluir</v-btn>
                        </v-row>
                    </v-card>

                    <br>
                </template>
            </template>
            
      <template v-slot:footer="{ pageCount }">
          <v-pagination v-model="page" :length="pageCount" @update:modelValue="atualizarListagem"></v-pagination>
        </template>
        </v-data-iterator>
    </div>
    <v-dialog max-width="500" v-model="abrirModal">
        <v-card title="Confirmação" class="bg-error">
            <v-card-text>
                Confirma a inativação desse usuário? Ele não será excluído, apenas inativado.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="SIM"
                    @click="excluirUsuario"
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
</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    const config = useRuntimeConfig();
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();
    import { useDisplay } from 'vuetify';
    const display = ref(useDisplay());
    const cabecalho = [
        { title: "", align: "start", key: "botoes", width: "150" },
        { title: "Código", align: "start", key: "id"},
        { title: "Nome", align: "start", key: "nome"},
        { title: "Perfil", align: "start", key: "perfil_usuario.nome"},
        { title: "E-mail", align: "start", key: "email"},
        { title: "Data de Cadastro", align: "start", key: "created_at" },
        { title: "Ativo", align: "start", key: "ativo", value: item => item.ativo == "S" ? "Sim" : "Não" },
    ];

    let abrirModal = ref(false);

    let carregando = ref(false);
    let carregandoPag = ref(false);
    let dadosUsuarios = reactive({data:[]});
    let usuariosFiltrados = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let usuarios = await $fetch(`${config.public.API_PATH}usuarios`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        dadosUsuarios.data = usuarios.dados;
        atualizarListagem(1);
        carregando.value = false;
    }

    const editar = id => {
        carregandoPag.value = true;
        $fetch(`${config.public.API_PATH}usuarios/${id}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        })
        .then(resposta => {
            store.editarUsuario(resposta.dados);
            router.push({ path: "/usuarios/criar" });
        })
        .catch(erro => console.error(erro))
        .then(() => carregandoPag.value = false);
    }

    let idExclusao = ref(null);
    const excluirUsuario = () => {
        $fetch(`${config.public.API_PATH}usuarios/${idExclusao.value}`, { method: "DELETE", 
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
         })
        .then(resposta => {
            abrirModal.value = false;
            getDados();
        })
        .catch(erro => console.error(erro));
    }

    const modalCancel = () => alert("Operação cancelada");

    const excluir = id => {
        abrirModal.value = true;
        idExclusao.value = id;
    }

    getDados();

    let page = ref(1);
    let itemsPerPage = ref(5);

    const atualizarListagem = newPage => {
        listarUsuarios( newPage);
    }

    const listarUsuarios = page => {
        const inicio = itemsPerPage.value * page - itemsPerPage.value;
        const fim = itemsPerPage.value * page;
        usuariosFiltrados.data = dadosUsuarios.data.slice(inicio, fim);
    }

</script>