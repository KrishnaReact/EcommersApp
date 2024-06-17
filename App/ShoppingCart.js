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
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TrashIcon from "react-native-vector-icons/FontAwesome";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import BackHeader from "./components/BackHeader";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { deleteItem } from "./redux/addProductsSlicer";

export default function ShoppingCart({ navigation }) {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [radioButton, setRadioButton] = useState("Local");
    const [click, setClick] = useState(false);
    const [shippingAmount, setShippingAmount] = useState('19.00')

    let cartProducts = useSelector((state) => state.addItemReducer.data)
    console.log('..........', cartProducts)


    useEffect(() => {
        if (isFocused) {
            if (cartProducts.length > 0) {
                const resultArray = [];
                let data = cartProducts.map(function (item) {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        imageurl: item.imageurl,
                        quantity: 1
                    }
                })
                //setCartData(data);

                data.map(item => {
                    if (resultArray.find(object => {
                        if (object.id == item.id) {
                            object.quantity++;
                            return true;
                        } else {
                            return false;
                        }
                    })) {
                    } else {
                        item.quantity = 1;
                        resultArray.push(item);
                    }

                })
                setCartData(resultArray);
                // var sum = 0;
                // resultArray.map((item, index) => {
                //     sum += item.quantity * (item.price)
                // })
                // setSubTotal(parseFloat(sum).toFixed(2))

                //console.log('>>>>>>>>',resultArray)
            }
        }
    }, [isFocused, cartProducts])


    const getSubTotalAmount = () => {
        var sum = 0;
        cartData.forEach(item => sum += item.quantity * (item.price));
        return parseFloat(sum).toFixed(2);
    }

    const getTotalAmount = () => {
        var sum = 0;
        if (radioButton == 'Shipping') {
            cartData.forEach(item => sum += item.quantity * (item.price));
            sum = parseInt(sum) + parseInt(shippingAmount)
            return parseFloat(sum).toFixed(2);
        } else if (radioButton == 'Local') {
            cartData.forEach(item => sum += item.quantity * (item.price));
            return parseFloat(sum).toFixed(2);
        }
        // cartData.forEach(item => sum += item.quantity * (item.price));
        // return parseFloat(sum).toFixed(2);
        //console.log('amount>>>>>>>',sum)
    }

    const increaseItemCount = async (index, item) => {

        item.quantity = item.quantity + 1
        cartData[index] = item
        setClick(!click);

        //console.log('quantity.....', cartData);

    }

    const decreaseItemCount = async (index, item) => {
        if (item?.quantity > 1) {
            item.quantity = item.quantity - 1
            cartData[index] = item
            setClick(!click);

            //console.log('decquantity.....', cartData);
        }
    }

    const localPickup = () => {
        if (radioButton == 'Shipping') {
            setRadioButton('Local')
        }
    }

    const addShipping = () => {
        if (radioButton == 'Local') {
            setRadioButton('Shipping')
        }
    }

    const deleteProduct = (index) => {
        dispatch(deleteItem(index))
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#DAC7ED'} ></Header>
            <BackHeader text={'Cart'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <VirtualizedScrollView>
                    <View style={{ flex: 1, marginVertical: 10, }}>
                        {cartData.length == 0 ? null :
                            <View style={{ flex: 1, }}>
                                <FlatList
                                    data={cartData}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={{ width: '95%', height: AdjustFontSize(120), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center', marginVertical: AdjustFontSize(10), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 5, }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: .5, }}>
                                                        <Image source={{ uri: item.imageurl }} style={{ flex: 1, borderRadius: 5, resizeMode: 'stretch', margin: 10 }} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flex: 1, margin: 10, }}>
                                                            <Text numberOfLines={2} style={{ fontSize: AdjustFontSize(13), fontWeight: '600', color: '#000', marginTop: 2 }}>{item.name}</Text>
                                                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '400', color: '#000', marginTop: 5 }}>{'$' + item.price}</Text>
                                                            <View style={{ flexDirection: 'row', marginTop: AdjustFontSize(5), alignItems: 'center' }}>
                                                                <View style={{ flex: .5, flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: AdjustFontSize(11), color: '#000', }}>{`Size: `}</Text>
                                                                    <View style={{ borderWidth: .5, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.3)', margin: 2 }}>
                                                                        <Text style={{ fontSize: AdjustFontSize(11), color: '#000', margin: AdjustFontSize(3) }}>{'M'}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: AdjustFontSize(11), color: '#000' }}>{'Color: '}</Text>
                                                                    <View style={{ borderWidth: .5, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.3)', margin: 2 }}>
                                                                        <Text style={{ fontSize: AdjustFontSize(11), color: '#000', margin: AdjustFontSize(3) }}>{'Red'}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '99%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 0, marginBottom: 2 }}>
                                                                <View style={{ width: '40%', flexDirection: 'row', borderWidth: .5, borderColor: 'rgba(0,0,0, 0.3)', height: AdjustFontSize(22), alignSelf: 'center', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => decreaseItemCount(index, item)} style={{ flex: 1, justifyContent: 'center', }}><Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(12), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'-'}</Text></TouchableOpacity>
                                                                    <Text style={{ flex: 1, fontSize: AdjustFontSize(11), color: '#966AF8', paddingHorizontal: 5, alignSelf: 'center', textAlign: 'center' }}>{item.quantity}</Text>
                                                                    <TouchableOpacity onPress={() => increaseItemCount(index, item)} style={{ flex: 1, justifyContent: 'center' }}><Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(12), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'+'}</Text></TouchableOpacity>
                                                                </View>
                                                                <TouchableOpacity style={{ flex: .4, justifyContent: 'center', position: 'absolute', right: 0, marginRight: 5 }}>
                                                                    <TrashIcon onPress={() => deleteProduct(index)} name='trash-o' size={AdjustFontSize(20)} style={{ color: '#bebec8', alignSelf: 'center' }}></TrashIcon>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                                <View style={{ marginTop: AdjustFontSize(20), width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '600', color: '#000', marginLeft: 5 }}>{'Order Summary'}</Text>
                                    <View style={{ width: '95%', alignSelf: 'center', marginTop: AdjustFontSize(10) }}>
                                        <View style={{ width: '100%', height: AdjustFontSize(35), flexDirection: 'row', }}>
                                            <View style={{ flex: .9, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: '#000', marginLeft: 5 }}>{'Subtotal'}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '500', color: '#000', marginHorizontal: 5, }}>{'$ ' + getSubTotalAmount()}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', minHeight: AdjustFontSize(35), flexDirection: 'row', marginVertical: 0, }}>
                                            <View style={{ flex: .9, marginTop: 3 }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: '#000', marginLeft: 5 }}>{'Shipping'}</Text>
                                            </View>
                                            <View style={{ flex: 1, marginTop: 3 }}>
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 0, }}>
                                                    <Icon onPress={() => localPickup()} name={radioButton === "Local" ? "radiobox-marked" : "radiobox-blank"} size={AdjustFontSize(18)} color={'#000'} />
                                                    <Text style={{ fontSize: AdjustFontSize(12), color: '#000', marginLeft: 5, fontWeight: '500' }}>{'Local pickup'}</Text>
                                                </View>
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                    <Icon onPress={() => addShipping()} name={radioButton === "Shipping" ? "radiobox-marked" : "radiobox-blank"} size={AdjustFontSize(18)} color={'#000'} />
                                                    <Text style={{ fontSize: AdjustFontSize(12), color: '#000', marginLeft: 5, fontWeight: '500' }}>{'Flat Rate : '}<Text style={{ fontWeight: 'bold' }}>{'$ ' + shippingAmount}</Text></Text>
                                                </View>
                                            </View>
                                        </View>
                                        {/* <View style={{ width: '100%', height: AdjustFontSize(35), flexDirection: 'row', marginVertical: 0, }}>
                                            <View style={{ flex: .9, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '500', color: '#000', marginLeft: 5 }}>{'Total'}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '400', color: '#000', marginHorizontal: 5 }}>{'$ ' + getTotalAmount()}</Text>
                                            </View>
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </VirtualizedScrollView>
                {cartData.length == 0 ? null :
                    <View style={{ width: '100%', height: AdjustFontSize(40), flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#eeeeee' }}>
                            <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '500', color: '#000', alignSelf: 'center' }}>{'$ ' + getTotalAmount()}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#966AF8' }}>
                            <Text style={{ fontSize: AdjustFontSize(14), fontWeight: '500', color: '#fff', alignSelf: 'center' }}>{'PLACE ORDER'}</Text>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaProvider>
    )
}