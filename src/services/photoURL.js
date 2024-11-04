export const photoURL = () => {

    const usePhoto = async (id) => {
        if (id) {
            let url = `http://localhost:8080/api/animais/${id}/foto`;
            return url;
        }
    }

    return { usePhoto }
}

export default photoURL
