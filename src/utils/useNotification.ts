import toast from 'react-hot-toast'

export const showSuccessMessage = (message: string) => {
  toast.success(message, { duration: 3000 })
}

export const showErrorMessage = (message: string) => {
  toast.error(message, { duration: 3000 })
}

export const showLoadingMessage = (message: string) => {
  toast(message, { duration: Infinity })
}
