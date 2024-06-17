import * as React from 'react';
import {

    StyleSheet,
    View,
    StatusBar,
    TextInput,
    Text,
    Image,
    ScrollView,
    Platform,

} from "react-native";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// const CustomHeaderbar = (
//     { backgroundColor,
//         barStyle = 'light-content' }
// ) => {
//const insets = useSafeAreaInsets();
// return (
//     <View style={{ height: insets.top, backgroundColor }}>
//         <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle}></StatusBar>
//     </View>
// )
//}

export default function Header({ backgroundColor }) {
    const insets = useSafeAreaInsets();
    return (

        <View style={{ height: insets.top, backgroundColor }}>
            <StatusBar animated={true} backgroundColor={backgroundColor} barStyle='dark-content' hidden={false}></StatusBar>
        </View>
    )
}