<template>
<div>
    <v-dialog max-width="500" v-model="showMd">
        <v-card title="Dialog">
            <v-card-text>
                <slot />
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="SIM"
                    @click="showMd = false; emit('modalSim')"
                ></v-btn>
                <v-btn
                    text="NÃO"
                    @click="showMd = false; emit('modalNao')"
                ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script setup>
    import { watch, ref } from "vue"
    let showMd = ref(false);
    const props = defineProps({ showModal: Boolean });
    const emit = defineEmits(["modalSim", "modalNao"])

    watch(() => props.showModal, (val,oldVal) => showMd.value = true);

</script>
