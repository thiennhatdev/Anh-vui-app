import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    notificationItem: {
        padding: space.sp10,
        flexDirection: flex.row,
        marginBottom: space.sp5
    },
    notificationItemRight: {
        marginLeft: space.sp10
    },
    notificationTime: {
        marginTop: space.sp10,
        color: color.silver
    }
})

export default styles;