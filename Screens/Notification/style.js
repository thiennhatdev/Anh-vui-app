import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    notificationWrap: {
        flex: 1,
        backgroundColor: color.white
    },
    loadMore: {
        textAlign: flex.center,
        paddingVertical: space.sp10,
        color: color.blue
    }
})

export default styles;