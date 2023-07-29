
import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";

const styles = StyleSheet.create({
    container: {
    },
    postCommentWrap: {
        backgroundColor: color.white,
        width: '100%',
        padding: space.sp10,
    },
    numberLike: {
        height: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: color.silver,
        paddingBottom: space.sp10,
        justifyContent: flex.center
    },
    postCommentContent: {
        paddingVertical: space.sp10,
    },
    commentFlatList: {
        paddingRight: space.sp10
    },  
    replyList: {
        marginLeft: space.sp30
    },
    emptyComments: {
        flex: 1,
        alignItems: flex.center,
        flexDirection: flex.row,
        justifyContent: flex.center
    },
    emptyCommentsText: {
        fontSize: 20,
        marginLeft: space.sp10
    },  
    postCommentInput: {
        borderTopWidth: 0.5,
        borderTopColor: color.silver,
        padding: space.sp10,
        position: "relative",
        height: 70,
    },
    wrapInput: {
        width: "100%",
    },
    wrapInputChild: {
        marginBottom: space.sp10
    },
    sendIcon: {
        position: "absolute",
        right: space.sp15,
        top: 10
    },  
    inputComment: {
        height: 50,
        borderWidth: 0.5,
        borderColor: color.silver,
        paddingLeft: space.sp10,
        paddingRight: space.sp40,
        borderRadius: 999
    },
    loadingWrap: {
        flex: 1,
        flexDirection: flex.row,
        justifyContent: flex.center,
        alignItems: flex.center
    }
})

export default styles;