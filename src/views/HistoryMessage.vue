
<script lang="ts">
export default {
    name: 'HistoryMessage'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
const messages = ref<Array<Record<string, any>>>([
    {
        senderDisplayName: "Kevein - Editor",
        senderProfileImage: "https://xsgames.co/randomusers/avatar.php?g=male",
        text: "@Design I’ve attached brief file to you. Thank you",
        type: "message"
    },
    {
        senderDisplayName: "Kevein - Editor",
        senderProfileImage: "https://xsgames.co/randomusers/avatar.php?g=male",
        text: "@Design Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
        type: "message"
    },
    {
        senderDisplayName: "Jinnie - Editor",
        senderProfileImage: "https://xsgames.co/randomusers/avatar.php?g=female",
        text: "@Design Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
        type: "message"
    },
])
</script>

<template>
    <section class="p-4 flex flex-col">
        <div data-atd="badge-date-time" class="flex flex-shrink-0 items-center justify-center">
            <p class="p-2 border rounded-xl text-white text-sm bg-[#00000026] text-center items-center justify-center">
                Yesterday
            </p>
        </div>
        <div v-for="(msg, index) in messages" :key="index">
            <div data-atd="item-message" class="flex flex-col">
                    <div class="flex flex-row pt-2">
                        <img :src="msg?.senderProfileImage" alt="sender avatar" class="rounded-full w-[30px] h-[30px]" />
                        <p class="px-2 text-xs text-[#111111]">{{ msg.senderDisplayName }}</p>
                    </div>
                    <div class="ml-10 p-4 rounded-xl speech-bubble">
                        {{ msg.text}}
                    </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.speech-bubble {
	position: relative;
	background: #EFEFEF;
	border-radius: .4em;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 30%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #EFEFEF;
	border-left: 0;
	border-top: 0;
	margin-top: -10px;
	margin-left: -20px;
}
</style>
    