<template>
    <div>
        <v-data-table
            :items="dadosUsuarios.data"
            :headers="cabecalho"
            :loading="carregando">
            <template v-slot:top>
                <h1 class="text-center bg-primary">Usuários</h1>
            </template>
            <template v-slot:item.botoes="{ item }">
                <v-btn rounded="0" size="small" icon="mdi-pencil" color="primary" @click="editar(item.id)" />
                <v-btn rounded="sm" size="small" icon="mdi-delete" color="error" @click="excluir(item.id)" />
            </template>
        </v-data-table>
        <utilitarios-modal :show-modal="abrirModal" @modal-sim="modalOK" @modal-nao="modalCancel" />
    </div>
    <!-- <h1>{{ testando }}</h1> -->

</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useCadastroUsuarioStore } from "@/stores/cadastrarUsuarios"
    const store = useCadastroUsuarioStore();
    const router = useRouter();
    const cabecalho = [
        { title: "", align: "start", key: "botoes", width: "150"},
        { title: "Código", align: "start", key: "id"},
        { title: "Nome", align: "start", key: "nome"},
        { title: "Perfil", align: "start", key: "perfil_usuario.nome"},
        { title: "E-mail", align: "start", key: "email"},
        { title: "Data de Cadastro", align: "start", key: "created_at" },
        { title: "Ativo", align: "start", key: "ativo", value: item => item.ativo == "S" ? "Sim" : "Não" },
    ];

    let abrirModal = ref(false);

    let carregando = ref(false);
    let dadosUsuarios = reactive({data:[]});
    async function getDados(){
        carregando.value = true;
        let usuarios = await $fetch('http://localhost:8000/api/usuarios');
        dadosUsuarios.data = usuarios.dados;
        carregando.value = false;
    }

    const editar = id => {
        $fetch(`http://localhost:8000/api/usuarios/${id}`)
        .then(resposta => {
            store.editarUsuario(resposta.dados);
            router.push({ path: "/usuarios/criar" });
        })
        .catch(erro => console.error(erro));
    }

    let idExclusao = ref(null);
    const modalOK = () => {
        $fetch(`http://localhost:8000/api/usuarios/${idExclusao.value}`, { method: "DELETE" })
        .then(resposta => {
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