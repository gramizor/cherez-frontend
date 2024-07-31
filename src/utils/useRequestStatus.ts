import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

type RequestStatus = 'idle' | 'pending' | 'succeeded' | 'failed'

const useRequestStatus = (loading: boolean, error: string | null, successMessage: string, onSuccess?: () => void) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle')

  useEffect(() => {
    if (requestStatus === 'pending' && !loading) {
      if (error !== null) {
        toast.error(error, {
          duration: 3000,
        })
        setRequestStatus('failed')
      } else {
        toast.success(successMessage, {
          duration: 3000,
        })
        setRequestStatus('succeeded')
        if (onSuccess) {
          onSuccess()
        }
      }
    }
  }, [loading, error, requestStatus, successMessage, onSuccess])

  const startRequest = () => {
    setRequestStatus('pending')
  }

  return [startRequest] as const
}

export default useRequestStatus
