import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";

const styles = StyleSheet.create({
    wrapProfile: {
        flex: 1,
        padding: space.sp10
    },
    item: {
        
        backgroundColor: color.white,
        paddingVertical: space.sp15,
        paddingHorizontal: space.sp10,
        marginBottom: space.sp10,
        borderRadius: space.sp5
    },
    innerItem: {
        flexDirection: flex.row,
        justifyContent: flex.spaceBetween,
    }
})

export default styles;