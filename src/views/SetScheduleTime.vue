
<script lang="ts">
export default {
    name: 'SetScheduleTime'
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getScheduleTimeByGroupId, GetScheduleTimeResponse, createScheduleTimeByGroupId } from "../api/botx"
import { getGroupIdFromRoute } from "../utils/getGroupIdFromRoute"
import { useRoute } from 'vue-router';

const scheduleTime = ref<GetScheduleTimeResponse | null>(null)
const groupId = ref<string | null>(null)

const days = ref<string[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
const daysSave = ref<string[]>([])

const route = useRoute()
const getGroupIdQuery = route.query["groupId"]
const loading = ref<boolean>(false)
const startWorkingTime = ref<string | null>(null)
const endWorkingTime = ref<string | null>(null)
const setMode = ref<boolean>(false)

const computedScheduleTimeKeys = computed(() => {
    if(scheduleTime.value && scheduleTime.value?.days.length > 0) {
        return  scheduleTime.value?.days.reduce((acc ,item) => {
            let newAcc = acc
            acc[item] = true
            return newAcc
        }, {} as Record<string, any>)
    }
    return {}
})

onMounted(async () => {
    loading.value = true
    const groupIdFromQuery = getGroupIdFromRoute(getGroupIdQuery)
    if (groupIdFromQuery) {
        groupId.value = groupIdFromQuery
        const resp = await getScheduleTimeByGroupId(groupIdFromQuery)
        scheduleTime.value = resp
    }
    loading.value = false
})

const handleSetMode =  async () => {
    setMode.value = !setMode.value
    startWorkingTime.value = null
    endWorkingTime.value = null
    daysSave.value = []
    const resp = await getScheduleTimeByGroupId(groupId.value || '')
    scheduleTime.value = resp
}

const handleSetScheduleTime = async () => {
    try {

        const start = startWorkingTime.value
        const end = endWorkingTime.value
        if (!start || !end || daysSave.value.length === 0) {
            alert('Please selected days !')
            return
        }
        loading.value = true
        await createScheduleTimeByGroupId(groupId.value || '', daysSave.value , start, end)
        const resp = await getScheduleTimeByGroupId(groupId.value || '')
        scheduleTime.value = resp
        setMode.value = false
        startWorkingTime.value = null
        endWorkingTime.value = null
        daysSave.value = []
    } catch (error) {
        console.error('set schedule time error ::', error)
        alert('Something went wrong, please try again')
    } finally {
        loading.value = false
    }
}


</script>

<template>
    <section class="flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-bold pb-2">Set Schedule Time</h1>
            <button class="bg-green-500 text-white border rounded-md text-base font-bold p-2" @click="handleSetMode">
                {{ !setMode ? 'Set' : 'Cancel' }}
            </button>
        </div>
        <div class="flex flex-col" v-if="setMode">
            <template v-for="(day) in days" :key="day">
                    <div class="flex flex-row justify-between py-2">
                        <span class="text-base">{{day}}</span><input type="checkbox"  name="daysSave" :value="day.toLowerCase()" v-model="daysSave">
                    </div>
            </template>
            <label class="text-base pb-2">StartWorkingTime: </label>
            <input type="time" name="startWorkingTime" v-model="startWorkingTime">
            <label class="text-base pb-2">EndWorkingTime: </label>
            <input type="time" name="endWorkingTime" v-model="endWorkingTime">
            <button 
                :class="{
                    'bg-green-500': !loading,
                    'bg-gray-400' : loading,
                }"
                class="bg-green-500 text-white border rounded-md text-base font-bold p-2 my-5"
                @click="handleSetScheduleTime"
            >
                {{ loading ?  'Loading...' : 'Update'}}
            </button>
        </div>
        <div v-if="!setMode && Object.keys(scheduleTime || {}).length > 0">
            <template v-for="(day) in days" :key="day">
                <div class="flex flex-row justify-between py-2">
                    <span class="text-base">{{day}}</span><input type="checkbox" :checked="computedScheduleTimeKeys[day.toLowerCase()]" >
                </div>
            </template>
            <div class="flex flex-col">
                <label class="text-base pb-2">StartWorkingTime: </label>
                <p class="text-base font-bold">{{ scheduleTime?.startWorkingTime }}</p>
                <label class="text-base pb-2">EndWorkingTime: </label>
                <p class="text-base font-bold">{{ scheduleTime?.endWorkingTime }}</p>
            </div>
            
        </div>
        <div v-if="!setMode &&  Object.keys(scheduleTime || {}).length === 0" class="h-[40vh] flex justify-center items-center">
            <div class="flex flex-col gap-y-3">
                <p class="text-2xl text-gray-300 text-center">
                    Let start to set schedule time for active your group
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
