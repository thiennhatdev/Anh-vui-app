import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    loadingWrap: {
        flex: 1,
        flexDirection: flex.row,
        justifyContent: flex.center,
        alignItems: flex.center
    },
    notificationWrap: {
        flex: 1,
        backgroundColor: color.white
    },
    emptyNotification: {
        flexDirection: flex.row,
        flex: 1,
        justifyContent: flex.center,
        alignItems: flex.center,
    },
    notiIcon: {
        fontSize: 27,
        color: color.red
    },
    emptyText: {
        fontSize: 20,
        marginLeft: space.sp5,
        color: color.red
    }
})

export default styles;