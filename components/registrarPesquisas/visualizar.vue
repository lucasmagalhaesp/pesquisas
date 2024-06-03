<template>
    <h2>Visualizar Pesquisa</h2>
</template>

<script setup>
    let dadosPesquisa = reactive({ data:[] });
    async function getDados(){
        let pesquisas = await $fetch('http://localhost:8000/api/pesquisasRealizadas/23', {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("pesquisaTokenUsuario")}` }
        });
        console.log(pesquisas.dados);
    }

    getDados();
</script>

<style>

</style>