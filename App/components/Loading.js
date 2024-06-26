import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text,
    Image,
    Dimensions,
} from "react-native";



const Loading = (props) => {
    const { loading } = props;
    //console.log('.......',loading)
    return (
        <Modal
            transparent={true}
            animationType={"none"}
            visible={loading}
            onRequestClose={() => {
                //console.log("close modal");
            }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color={'#966AF8'}
                        hidesWhenStopped={true}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#00000040",
    },
    activityIndicatorWrapper: {
        backgroundColor: "#FFFFFF",
        height: 100,
        width: 100,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
});

export default Loading;
