<template>
    <div>
        <v-data-table
            :items="dadosUsuarios.data"
            :headers="cabecalho"
            :loading="carregando"
        >
            <template v-slot:top>
                <v-row class="mb-1">
                    <v-col>
                        <h1 class="bg-white cor1">Usuários</h1>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn class="bg-cor4" prepend-icon="mdi-plus" rounded="sm" @click="$router.push({ path: 'usuarios/criar' })">Novo Usuário </v-btn>
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
        <v-overlay
            :model-value="carregandoPag"
            class="align-center justify-center"
            >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <v-dialog max-width="500" v-model="abrirModal">
            <v-card title="Confirmação" class="bg-error">
                <v-card-text>
                    Confirma a exclusão desse usuário?
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
    </div>
    <!-- <h1>{{ testando }}</h1> -->

</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();
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
    async function getDados(){
        carregando.value = true;
        let usuarios = await $fetch('http://localhost:8000/api/usuarios', {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}`}
        });
        dadosUsuarios.data = usuarios.dados;
        carregando.value = false;
    }

    const editar = id => {
        carregandoPag.value = true;
        $fetch(`http://localhost:8000/api/usuarios/${id}`, {
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
        $fetch(`http://localhost:8000/api/usuarios/${idExclusao.value}`, { method: "DELETE", 
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
        abrirModal.value = !abrirModal.value;
        idExclusao.value = id;
    }

    getDados();

</script>