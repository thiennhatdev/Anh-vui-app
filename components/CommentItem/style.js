import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    commentItem: {
        flexDirection: flex.row,
        marginBottom: space.sp10
    },
    commentItemRight: {
        marginLeft: space.sp10,
        flex: 1
    },
    commentItemContent: {
        padding: space.sp10,
        borderRadius: space.sp15,
        backgroundColor: color.lightSilver,
        marginBottom: space.sp5
    },
    commentItemBottom: {
        flexDirection: flex.row,
        justifyContent: flex.spaceBetween,
        paddingHorizontal: space.sp10
    },
    commentItemBottomLeft: {
        flexDirection: flex.row,
    },
    commentItemBottomRight: {
        flexDirection: flex.row,
    },
    likeText: {
        marginRight: space.sp10
    },
    replyTime: {
        marginRight: space.sp10
    },
    numberLike: {
        flexDirection: flex.row,
        alignItems: flex.center
    },
    smileIcon: {
        marginRight: space.sp5
    }
})

export default styles;