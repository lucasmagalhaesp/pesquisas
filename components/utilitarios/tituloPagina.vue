<template>
    <div class="titulo-pagina" style="padding: 20px 0">
        <h1 class="text-bold">{{ titulo }}</h1>
    </div>
</template>
<script>
export default {
    props: ["titulo"]
}
</script>

<style scoped>
    div.titulo-pagina{
        border-bottom: solid 1px #0288d1
    }
    div.titulo-pagina h1{
        color: #0288d1
    }
    .titulo-pagina{
        padding: 3px 0
    }
    .titulo-pagina >>> h1{
        font-size: 20px;
        line-height: 0;
        text-align: center;
    }
</style>