
import { Dimensions, StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postCommentWrap: {
        backgroundColor: color.white,
        width: '100%',
        height: ScreenHeight - 70,
        padding: space.sp10
    },
    numberLike: {
        borderBottomWidth: 0.5,
        borderBottomColor: color.silver,
        paddingBottom: space.sp10
    },
    postCommentContent: {
        paddingTop: space.sp10,
        paddingBottom: space.sp50,
        flex: 1,
    },
    commentFlatList: {
        paddingRight: space.sp15
    },  
    replyList: {
        marginLeft: space.sp30
    },
    postCommentInput: {
        flexDirection: flex.row,
        borderTopWidth: 0.5,
        borderTopColor: color.silver,
        padding: space.sp10,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0

    },
    wrapInput: {
        position: 'relative',
        width: "100%",
    },
    wrapInputChild: {
        marginBottom: space.sp10
    },
    sendIcon: {
        position: "absolute",
        right: space.sp15,
        top: 10,
        color: color.blue
    },  
    inputComment: {
        borderWidth: 0.5,
        borderColor: color.silver,
        paddingVertical: space.sp10,
        paddingLeft: space.sp10,
        paddingRight: space.sp40,
        borderRadius: 999
    }
})

export default styles;