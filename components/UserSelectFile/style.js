import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapSelectFile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    avatar: {
        flex: 1
    },
    selectImage: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 4,

    },
    selectImageInner: {
        backgroundColor: 'transparent',
        alignItems: "center",
    },
    selectImageText: {

    },
})

export default styles;