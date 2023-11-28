import { LocationQueryValue } from "vue-router"


export function getTagIdFromRoute(route: LocationQueryValue | LocationQueryValue[]): string | null {
    if (!Array.isArray(route)) {
        const id = route?.toString()
        if (id) {
            return id
        }
    }
    return null
}
