import { StyleSheet } from "react-native";
import flex from './../../commons/variable/flex';
import space from './../../commons/variable/space';
import fontSize from './../../commons/variable/fontSize';
import color from './../../commons/variable/color';

const styles = StyleSheet.create({
    postWrapper: {
        backgroundColor: color.white,
        marginTop: space.sp10
    },  
    postAuthor: {
        flex: 1,
        flexDirection: flex.row,
        padding: space.sp10,
    },
    postAuthorRight: {
        marginLeft: space.sp10
    },
    name: {
        fontWeight: "bold"
    },
    createdTime: {
        fontSize: fontSize.f12
    },
    postTitle: {
        padding: space.sp10,
        
    },
    postTitleText: {
        fontSize: fontSize.f20,
        color: color.black,
        marginBottom: space.sp15
    },
    postImage: {
        aspectRatio: 1 ,
        resizeMode: 'contain',
        
    },
    analytic: {
        marginHorizontal: space.sp5,
        paddingVertical: space.sp5,
        flexDirection: flex.row,
        justifyContent: flex.spaceBetween,
        alignItems: flex.center,
        borderBottomColor: color.silver,
        borderBottomWidth: 0.5,
        padding: space.sp5
    },
    analyticLike: {
        flexDirection: flex.row,
        alignItems: flex.center
    },
    number: {
        marginLeft: space.sp5
    },
    actionBar: {
        flexDirection: flex.row,
        justifyContent: flex.spaceBetween,
        padding: space.sp10,

    }
})

export default styles;
