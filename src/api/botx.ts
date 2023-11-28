import axios from "axios"

const BASE_URL = `https://project-x-bot-c7545967df6c.herokuapp.com`

export interface TagsByGroupIdResponse {
    groupId: number;
    tagId: number;
    tagName: string;
    users: string[];
}

export interface Friend {
    displayName: string;
    pictureUrl: string;
    userId: string;
}

export type FriendsResponse = Friend[]

// {
//     "days": [
//         "monday",
//         "tuesday"
//     ],
//     "groupId": "C96a98730a8bdfc9108d4bc77792ef15e",
//     "startWorkingTime": "09:45",
//     "endWorkingTime": "10:45"
// }
export interface GetScheduleTimeResponse {
    days: string[]
    startWorkingTime: string;
    endWorkingTime: string;
}

export const getTagsByGroupId = async (groupId: string): Promise<TagsByGroupIdResponse[]> => {
    try {
        const resp = await axios.get<TagsByGroupIdResponse[]>(`${BASE_URL}/groupId/${groupId}/tags`)
        return resp.data
    } catch (error) {
        console.error('getTagsByGroupId Error: ', error)
        throw error
    }
}

export const createTag = async (groupId: string, tagName: string): Promise<void> => {
    try {
        await axios.post<TagsByGroupIdResponse[]>(`${BASE_URL}/groupId/${groupId}/tag`, {
            tagName,
        })
    } catch (error) {
        console.error('createTag Error: ', error)
        throw error
    }
}

export const updateTag = async (groupId: string, tagId: string, tagName: string, users: string[]): Promise<void> => {
    try {
        await axios.put<any>(`${BASE_URL}/groupId/${groupId}/tag/${tagId}/edit`, {
            tagName,
            users
        })
    } catch (error) {
        console.error('updateTag Error: ', error)
        throw error
    }
}

export const getScheduleTimeByGroupId = async (groupId: string,): Promise<GetScheduleTimeResponse> => {
    try {
        const resp = await axios.get<GetScheduleTimeResponse>(`${BASE_URL}/groupId/${groupId}/schedule`)
        return resp.data
    } catch (error) {
        console.error('getScheduleTimeByGroupId Error: ', error)
        throw error
    }
}

export const createScheduleTimeByGroupId = async (groupId: string, days: string[], startWorkingTime: string, endWorkingTime: string): Promise<void> => {
    try {
        await axios.put<any>(`${BASE_URL}/groupId/${groupId}/schedule`, {
            days,
            startWorkingTime,
            endWorkingTime
        })
    } catch (error) {
        console.error('createScheduleTimeByGroupId Error: ', error)
        throw error
    }
}

export const getFriendsByGroupId = async (groupId: string): Promise<FriendsResponse> => {
    try {
        const resp = await axios.get<FriendsResponse>(`${BASE_URL}/groupId/${groupId}/friends`)
        return resp.data
    } catch (error) {
        console.error('getFriendsByGroupId Error: ', error)
        throw error
    }
}