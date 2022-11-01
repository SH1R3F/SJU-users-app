import { useToast as useToastOriginal } from "vue-toastification"

export const useToast = () => {
	return useToastOriginal()
}
