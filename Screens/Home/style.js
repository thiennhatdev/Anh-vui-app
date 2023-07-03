import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

    },
    topHome: {
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
    contentHome: {
        flex: 1
    }
})

export default styles;