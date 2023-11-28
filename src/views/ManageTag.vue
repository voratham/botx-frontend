
<script lang="ts">
export default {
    name: 'ManageTag'
};
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTagsByGroupId, TagsByGroupIdResponse } from "../api/botx"
import { getGroupIdFromRoute } from "../utils/getGroupIdFromRoute"
import { useRoute } from 'vue-router';

const tags = ref<TagsByGroupIdResponse[]>([])
const groupId = ref<string | null>(null)

const route = useRoute()
const getGroupIdQuery = route.query["groupId"]
const loading  = ref<boolean>(false)

onMounted(async () => {
    loading.value =true
    const groupIdFromQuery = getGroupIdFromRoute(getGroupIdQuery)
    if (groupIdFromQuery) {
        groupId.value = groupIdFromQuery
        const resp = await getTagsByGroupId(groupIdFromQuery)
        tags.value = resp
    }
    loading.value = false
})


</script>

<template>
    <section class="flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-bold pb-2">Tags Manager </h1>
            <router-link class="bg-green-500 text-white border rounded-md text-base font-bold p-2"
                :to="`/manage-tag/create?groupId=${groupId}`">
                New @Tag
            </router-link>
        </div>
        <div class="flex flex-col gap-y-3">
            <ul v-if="!loading && tags && tags.length > 0">
                <li class="border-b py-3" v-for="(tag, index) in tags" :key="index">
                    <div class="flex flex-row justify-between items-center">
                        <p class="text-base font-semibold">{{ tag.tagName }} ({{ (tag.users ?? []).length }})</p>
                        <router-link class="border rounded-md text-base p-2"
                            :to="`/manage-tag/edit?tagId=${tag.tagId}&groupId=${groupId}`">Edit</router-link>
                    </div>
                </li>
            </ul>
            <div v-if="!loading && tags && tags.length === 0" class="h-[40vh] flex justify-center items-center">
                <h1 class="text-2xl text-gray-300 text-center">
                    Let start to create @tag
                </h1>
            </div>
            <div v-if="loading" class="">
                <div v-for="(_ , index) in [1,2,3,4,5,6,7,8,9,10]" class="w-full h-[30px] bg-gray-200 my-7" :key="index"/>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
