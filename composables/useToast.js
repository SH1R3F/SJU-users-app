import { useToast as useToastOriginal } from "vue-toastification"

export const useToast = () => {
	if (process.client) {
		return useToastOriginal()
	}
	return {
		success: () => {},
		error: () => {},
		info: () => {},
		warning: () => {},
	}
}
