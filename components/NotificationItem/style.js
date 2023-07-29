import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    notificationItem: {
        padding: space.sp10,
        flexDirection: flex.row,
        marginBottom: space.sp5,
    },
    notificationItemRight: {
        marginHorizontal: space.sp10,
        flex: 1
    },
    notificationContent: {
        color: color.black,
    },
    notificationTime: {
        marginTop: space.sp10,
    }
})

export default styles;