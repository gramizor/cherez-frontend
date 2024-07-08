import { User } from '@/src/types/models'

export interface AuthState {
  currentUser: User | null
  error: string | null
  loading: boolean
  isSignedIn: boolean
}

export type CurrentUserResponse = User
