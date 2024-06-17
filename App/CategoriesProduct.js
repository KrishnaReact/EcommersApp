import * as React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    LogBox,
    PixelRatio,
    PermissionsAndroid,
    BackHandler,
    ImageBackground,
    FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";
import BackSearchHeader from "./components/BackSearchHeader";


export default function CategoriesProduct({ navigation, route }) {

    console.log('route>>>>>>>>', route.params)

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#DAC7ED'} ></Header>
            <BackSearchHeader navigation={navigation} />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginVertical: AdjustFontSize(15) }}>
                    <FlatList
                        data={route.params.products}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={index} style={{ flex: .5, height: AdjustFontSize(200), backgroundColor: '#fff', borderRadius: 5, marginVertical: AdjustFontSize(10), marginHorizontal: AdjustFontSize(5), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5, }}>
                                    <Image source={{ uri: item.imageurl }} style={{ width: '100%', height: AdjustFontSize(160), borderTopLeftRadius: 5, borderTopRightRadius: 5, resizeMode: 'stretch' }} />
                                    <View style={{ width: '100%', marginTop: 5 }}>
                                        <Text numberOfLines={1} style={{ fontSize: AdjustFontSize(11), fontWeight: '600', color: '#000', marginHorizontal: 5 }}>{item.name}</Text>
                                        <Text style={{ fontSize: AdjustFontSize(10), fontWeight: '400', color: '#000', marginHorizontal: 5, marginTop: 3 }}>{'$'+item.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    )
}