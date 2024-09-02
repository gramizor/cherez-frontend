import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getLoading } from 'src/redux/selectors/auth'
import { setJWTBearerToken } from '@/src/lib/storage'
import { currentUserRequested } from '@/src/redux/slices/auth'
import LoadingCircular from '@/src/components/atoms/LoadingCircular/LoadingCircular.styled'

type Props = {
  children: ReactNode
}
export default function CurrentUserProvider({ children }: Props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const loading = useSelector(getLoading)
  let token = null

  const loadCurrentUser = async () => {
    const token = await setJWTBearerToken()
    if (!loading) {
      if (token && !currentUser) {
        dispatch(currentUserRequested())
      }
    }
  }

  useEffect(() => {
    loadCurrentUser().then()
  }, [token, currentUser, dispatch])

  if (loading) {
    return <LoadingCircular isLoading={true} />
  }
  return children
}
