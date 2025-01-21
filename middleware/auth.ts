import { useAuth } from "~/composables/auth"

export const AUTH_INFO = '0312813'
export const AUTH_LABEL = 'auth'

// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated() && to.name !== 'login') {
    return navigateTo('/login')
  }
})
