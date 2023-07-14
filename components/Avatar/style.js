
import { Dimensions, StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    wrapAvatar: {
        width: space.sp30,
        height: space.sp30,
        borderRadius: 1000,
        borderColor: color.blue,
        alignItems: flex.center,
        justifyContent: flex.center,
        backgroundColor: color.blue,
    },
    imageAvatar: {
        width: space.sp30,
        height: space.sp30,
        borderRadius: 1000,
    },
    textAvatar: {
        color: color.white,
    }
})

export default styles;