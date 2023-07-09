import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: flex.center,
        alignItems: flex.center,

    },
    headerModal: {
        width: '100%',
        textAlign: flex.center,
        paddingVertical: space.sp10,
        borderBottomWidth: 0.5,
        borderBottomColor: color.silver,
        fontSize: 20,
        color: color.blue
    },
    modalView: {
        width: '90%',
        margin: space.sp10,
        backgroundColor: color.white,
        borderRadius: space.sp5,
        padding: space.sp10,
        alignItems: flex.center,
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bodyModal: {
        width: '100%',
        padding: space.sp10,
        marginBottom: space.sp10,
    },
    selectImage: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.lightSilver,
        padding: 10,
        borderRadius: 4,

    },
    selectImageInner: {
        alignItems: flex.center
    },
    selectImageText: {
        marginTop: space.sp10
    },
    captionInput: {
        marginTop: space.sp10,
        borderRadius: space.sp5,
        padding: space.sp5,
        backgroundColor: color.lightSilver
    },
    footerModal: {
        flexDirection: flex.row
    },  
    button: {
        borderRadius: space.sp5,
        padding: space.sp10,
        elevation: 2,
        width: 80
    },
    buttonSubmit: {
        marginLeft: space.sp5,
        backgroundColor: color.blue,
    },
    buttonClose: {
        backgroundColor: color.silver,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default styles;