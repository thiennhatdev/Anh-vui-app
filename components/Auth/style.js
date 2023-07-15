
import { Dimensions, StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    wrapAuth: {
        alignItems: flex.center,
        padding: space.sp10,
        backgroundColor: color.white,
        flex: 1
    },
    loginText: {
        marginVertical: space.sp20,
        borderBottomWidth: 0.5,
        borderBottomColor: color.silver,
        paddingBottom: space.sp10,
        fontSize: 16,
        fontWeight: "700"
    }
})

export default styles;