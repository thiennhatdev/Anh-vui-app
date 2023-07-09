import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";

const styles = StyleSheet.create({
    wrapLogo: {
        flexDirection: "row", 
        justifyContent: "center"
    },
    logo: {
        height: 70, 
        width: "50%", 
        objectFit: "cover",
    }
})

export default styles;