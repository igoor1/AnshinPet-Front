export const photoURL = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const usePhoto = async (id) => {
        if (id) {
            let url = `${apiUrl}animais/${id}/foto`;
            return url;
        }
    }

    return { usePhoto }
}

export default photoURL
