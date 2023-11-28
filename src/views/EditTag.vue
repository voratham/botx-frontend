<script lang="ts">
export default {
  name: 'EditTag'
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Friend, FriendsResponse, getFriendsByGroupId, getTagsByGroupId, TagsByGroupIdResponse, updateTag } from "../api/botx"
import { useRoute, useRouter } from 'vue-router';
import { getGroupIdFromRoute } from '@/utils/getGroupIdFromRoute';
import { getTagIdFromRoute } from '@/utils/getTagIdFromRoute';

const groupId = ref<string | null>(null)
const route = useRoute()
const getGroupIdQuery = route.query["groupId"]
const getTagIdQuery = route.query["tagId"]
const tagId = ref<string | null>(null)
const loading = ref<boolean>(false)
const tags = ref<TagsByGroupIdResponse[]>([])
const currentTag = ref<TagsByGroupIdResponse | null>(null)
const friends = ref<FriendsResponse>([])
const friendSelected = ref<Record<string,FriendWithSelectedOption>>({})

interface FriendWithSelectedOption extends Friend {
  isSelected : boolean
}

const computedFriends = computed<FriendWithSelectedOption[]>(() => {
  if (friends.value.length === 0) {
    return [] as FriendWithSelectedOption[]
  } 

  if (currentTag.value?.users.length === 0) {
    const newFriends = friends.value.map( f => {
      return {...f , isSelected : false} as FriendWithSelectedOption
    }) 
    return newFriends
  }

  
  let combineNewFriends : Record<string,FriendWithSelectedOption> = {}
  for (const friend of friends.value) {
    for (const userId of currentTag.value?.users ?? []) {
      // in case not with in map
      if (!combineNewFriends[friend.userId]) {
        combineNewFriends[friend.userId] = { ...friend , isSelected: false}
      }

      if (userId === friend.userId) {
        combineNewFriends[friend.userId] =  { ...friend, isSelected: true }
      } else {
      }
    }
  }
  
  const newFriends = Object.keys(combineNewFriends).map( userId =>  ({...combineNewFriends[userId]}) )
  friendSelected.value = combineNewFriends
  return newFriends



})

const initializeGroupIdAndTagId = async (groupId: string) => {
  const friendsResp = await getFriendsByGroupId(groupId);
  friends.value = friendsResp;

  const tagsResp = await getTagsByGroupId(groupId);
  tags.value = tagsResp;

  const _currentTag = tagsResp.find(tag => String(tag.tagId) === tagId.value)
  currentTag.value = _currentTag || null

}


onMounted(async () => {
  loading.value = true
  const groupIdFromQuery = getGroupIdFromRoute(getGroupIdQuery)
  const getTagIdFromQuery = getTagIdFromRoute(getTagIdQuery)
  if (groupIdFromQuery) {

    groupId.value = groupIdFromQuery
    tagId.value = getTagIdFromQuery
    await initializeGroupIdAndTagId(groupIdFromQuery);
  }
  loading.value = false
})

const handleUpdateTag = async () => {
  loading.value = true
  try {
    if (groupId.value === null ||
      groupId.value === '' ||
      currentTag.value === null ||
      tagId.value === null
    ) {
      throw Error(`Something went wrong about groupId: ${groupId.value} , tagId: ${tagId} `)
    }
    const newFriendSelectedEqualTrue = Object.keys(friendSelected.value).filter( userId => {
        if(friendSelected.value[userId].isSelected) {
          return friendSelected.value[userId]
        }
    })

    
    currentTag.value.users = newFriendSelectedEqualTrue
    await updateTag(groupId.value, tagId.value, currentTag.value.tagName, currentTag.value.users)

    // initialize
    await initializeGroupIdAndTagId(groupId.value)
    const router = useRouter()
    confirm('Update Success')
    router.push("manage-tag")

  } catch (error) {
    console.error("handleUpdateTag Error:", error)
    alert(error)
  } finally {
    loading.value = false
  }
}

const handleUpdateCheckBox = (friend: FriendWithSelectedOption ,e: any) => {
  friendSelected.value[friend.userId] = {...friend , isSelected : e.target.checked}
}
</script>

<template>
  <section class="flex flex-col p-4">
    <h1 class="text-xl font-bold pb-2">Edit {{ currentTag?.tagName }}</h1>
    <p class="text-[16px]">
      Please edit your tag
    </p>
    <div class="pb-2" />
    <input class="border rounded-md p-[11px] outline-none" type="text" name="tagName" placeholder="@Tag"
      v-model="(currentTag ?? { tagName: '' }).tagName" />
    <div class="py-3" />
    <div data-atd="friend-list">
      <ul v-if="computedFriends && computedFriends.length > 0">
        <li v-for="(friend) in (computedFriends)" :key="friend.userId"
          class="flex flex-row items-center border-b py-2 justify-between">
          <div class="flex flex-row items-center">
            <img :src="friend?.pictureUrl" alt="avatar" class="rounded-full w-[50px]  flex-shrink-0" />
            <p class="pl-2">{{ friend.displayName }}</p>
          </div>
          <div>
            <input type="checkbox" :value="friend" :checked="friend.isSelected"   @input="(val) => handleUpdateCheckBox(friend, val)">
          </div>
        </li>
      </ul>
    </div>
    <div class="py-3" />
    <button @click="handleUpdateTag" :class="{
      'bg-green-500': !loading,
      'bg-gray-400': loading,
    }" class="text-white rounded-md text-base font-bold py-3">
      {{ loading ? 'Loading...' : 'Update' }}
    </button>
  </section>
</template>

<style scoped></style>

