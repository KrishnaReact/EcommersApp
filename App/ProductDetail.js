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
    UIManager,
    LayoutAnimation,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ArrowIcon from "react-native-vector-icons/Octicons";
import StarIcon from "react-native-vector-icons/Octicons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdjustFontSize from "./components/AdjustFontSize";
import Header from "./components/Header";
import BackHeader from "./components/BackHeader";
import VirtualizedScrollView from "./components/VirtualizedScrollView";
import IonIcon from "react-native-vector-icons/Ionicons";
import Loading from "./components/Loading";
import { ImageSlider } from "react-native-image-slider-banner";
import ImageResizer from "./components/ImageResizer";
import { addItem } from "./redux/addProductsSlicer";

let imageResizerObj = new ImageResizer();
export default function ProductDetail({ navigation, route }) {

    console.log('route>>>>>>>', route.params);
    const dispatch = useDispatch();
    const [selectDescription, setSelectDescription] = useState(true);
    const [selectAdditionalInformation, setSelectAdditionalInformation] = useState(false);
    const [selectReview, setSelectReview] = useState(false);
    const [productRating, setProductRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);

    const color_data = [
        {
            id: '1',
            color: 'Red'
        },
        {
            id: '2',
            color: 'Green'
        },
        {
            id: '3',
            color: 'Yellow'
        },
        {
            id: '4',
            color: 'Black'
        }
    ]
    const size_data = [
        {
            id: '1',
            size: 'S',
        },
        {
            id: '2',
            size: 'M',
        },
        {
            id: '3',
            size: 'L',
        },
        {
            id: '4',
            size: 'XL',
        },
        {
            id: '5',
            size: 'XXL',
        }
    ]
    useEffect(() => {
        const finddupchar = (str) => {
            let obj = {}
            for (let i = 0; i < str.length; i++) {
                if (obj[str[i]]) {
                    obj[str[i]] += obj[str[i]]
                } else {
                    obj[str[i]] = 1
                }
            }
            for (let a in obj) {
                //if(obj[a]>1)
                //console.log('........',a+'..count'+obj[a])
            }
            // console.log('........',obj)
        }
        finddupchar('nitin')
        let obj1 = {}
        let str = 'nitint'
        for (val of str) {
            obj1[val] = (obj1[val] || 0) + 1
        }
        function fecto(n) {
            let x = 1;
            if (n == 0) {
                return 1;
            } else {
                for (let i = n; i >= 1; i--) {
                    x = x * i
                }
                return x
            }
        }
        const pele = (str) => {
            let j = str.length - 1;
            for (let i = 0; i < str.length / 2; i++) {
                if (str[i] != str[j]) {
                    return false
                }
                j--
            }
            return true

            //let res=str.split('').reverse().join('')
        }

        for (var i = 0; i < 4; i++) {
            setTimeout(function (x) {
                return function () {
                    // console.log('>>>>>',x)
                }
            }(i), 1000 + i)
        }
        for (var i = 0; i < 4; i++) {
            (function (x) {
                //setTimeout(()=>console.log('<<<<<<<',x),100*i)
            }(i))
        }

        const uniq = (str) => {
            let data = []
            for (let i = 0; i < str.length; i++) {
                if (!data.includes(str[i])) {
                    data.push(str[i])
                } else {
                    return false
                }
            }
            return true
        }
        const array = [2, 4, 6, 3, 8, 3]
        let larg = array[0]
        const findlarg = () => {
            for (let i = 0; i < array.length; i++) {
                if (array[i] > larg) {
                    larg = array[i]
                }
            }
            return larg
        }
        const lag = array.reduce((a, b) => { return (a > b) ? a : b })

        const calbac = (sum) => {
            //console.log('1111',sum)
        }
        const callOper = (a, b, oper) => {
            let sum = a + b;
            oper(sum)
        }
        callOper(3, 4, calbac)

        const person = {
            fullName: function () {
                return this.firstname + ' ' + this.lastname
            }
        }
        const pers = {
            firstname: 'rahul',
            lastname: 'boss'
        }
        //person.fullName.call(pers)
        const addsum = (...arg) => {
            let sum = 0;
            for (let i of arg) {
                sum += i
            }
            return sum
        }
        // addsum(...array)
        const dupli = array.filter((a, b) => array.lastIndexOf(a) == b)

        const checkprime = (num) => {
            if (num <= 1) {
                return false
            }
            for (let i = 2; i < num; i++) {
                if (num % i == 0) {
                    return false
                }
            }
            return true
        }
        //console.log('........', checkprime(5))

    }, []);

    const getData = async () => {
        let params = {
            methoh: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'key': 'value'
            })
        }
        let respon = await fetch('', params);
        let res = await respon.json()

        let form = new FormData();
        form.append('key', 'value');
        //    await axios.post('',form,
        //    {
        //     headers:{
        //         'Content-Type':'application/josn'
        //     }
        //    }
        // ).then((res)=>{

        // }).catch((err)=>{

        // })
    }


    const setDescription = () => {
        setSelectDescription(true);
        setSelectAdditionalInformation(false)
        setSelectReview(false);
    }

    const setAdditionalInformation = () => {
        setSelectDescription(false);
        setSelectAdditionalInformation(true)
        setSelectReview(false);
    }

    const setReview = () => {
        setSelectDescription(false);
        setSelectAdditionalInformation(false)
        setSelectReview(true);
    }

    let Product_Rating_Bar = [];
    const getProductRating = () => {

        for (let i = 1; i <= maxRating; i++) {
            Product_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => setProductRating(i)}
                >
                    <StarIcon
                        size={25}
                        name={'star-fill'}
                        style={{ alignSelf: 'center', marginHorizontal: 2, color: i <= productRating ? '#966AF8' : '#bdbbbb' }}
                    />
                </TouchableOpacity>
            );
        }
        //console.log("productRating>>",productRating);
    }

    const addItemToCart = () => {
        dispatch(addItem(route.params.Product));
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff', }}>
            <Header backgroundColor={'#DAC7ED'} ></Header>
            <BackHeader text={'Product Detail'} navigation={navigation} />
            <VirtualizedScrollView>
                <View style={{ flex: 1, marginBottom: AdjustFontSize(10) }}>
                    <View style={{ width: '100%', height: AdjustFontSize(300), }}>
                        <ImageSlider
                            caroselImageStyle={{ resizeMode: 'contain', height: '100%', }}
                            activeIndicatorStyle={{ backgroundColor: '#000' }}
                            indicatorContainerStyle={{ bottom: -15 }}
                            data={[
                                { img: route.params.Product.imageurl },
                                { img: route.params.Product.imageurl },
                                // { img: 'https://img.freepik.com/free-photo/handsome-man-wearing-sunglasses-standing-grey-wall_171337-14981.jpg?t=st=1713418084~exp=1713421684~hmac=a9de05ca05052f0f86537573817aeb2f04143e5ccbfe13c43152a9be113b6e47&w=826' },
                                //{ img: 'https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-black-suit_158538-11489.jpg?t=st=1713418254~exp=1713421854~hmac=0abae27ce4a15ffcdace68a161b3c3781b8663a976ec102efb1367a81a9756d3&w=826' },
                            ]}
                            autoPlay={false}
                            preview={false}
                        //localImg
                        >
                        </ImageSlider>
                    </View>
                    <View style={{ marginTop: AdjustFontSize(10), marginHorizontal: AdjustFontSize(15) }}>
                        <Text style={{ fontSize: AdjustFontSize(15), fontWeight: 'bold', color: '#000', marginTop: AdjustFontSize(15), }}>{route.params.Product?.name}</Text>
                        <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: '#000', marginTop: AdjustFontSize(5) }}>{route.params.Product.price}</Text>
                        <View style={{ width: '99%', height: .5, backgroundColor: 'rgba(0,0,0, 0.3)', marginTop: AdjustFontSize(20) }}></View>
                    </View>
                    <View style={{ width: '100%', marginTop: AdjustFontSize(20) }}>
                        <Text style={{ fontSize: AdjustFontSize(14), fontWeight: 'bold', color: '#000', marginHorizontal: AdjustFontSize(10) }}>{'Color'}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: AdjustFontSize(10), flexWrap: 'wrap', paddingHorizontal: AdjustFontSize(15) }}>
                            {color_data.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ borderWidth: .5, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.3)', margin: 5 }}>
                                        <Text style={{ fontSize: AdjustFontSize(11), color: '#000', margin: AdjustFontSize(5) }}>{item.color}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: AdjustFontSize(20) }}>
                        <Text style={{ fontSize: AdjustFontSize(14), fontWeight: 'bold', color: '#000', marginHorizontal: AdjustFontSize(10) }}>{'Size'}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: AdjustFontSize(10), flexWrap: 'wrap', paddingHorizontal: AdjustFontSize(15) }}>
                            {size_data.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ borderWidth: .5, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.3)', margin: 5 }}>
                                        <Text style={{ fontSize: AdjustFontSize(11), color: '#000', margin: AdjustFontSize(5) }}>{item.size}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: AdjustFontSize(20), flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ width: '80%', height: AdjustFontSize(30), flexDirection: 'row', borderWidth: .5, borderColor: 'rgba(0,0,0,0.3)', alignSelf: 'center', borderRadius: 40 }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(20), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'-'}</Text>
                                </TouchableOpacity>
                                <Text style={{ flex: 1, fontSize: AdjustFontSize(12), fontWeight: 'bold', color: '#000', paddingHorizontal: 5, alignSelf: 'center', textAlign: 'center' }}>{'1'}</Text>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text adjustsFontSizeToFit={true} style={{ fontSize: AdjustFontSize(20), color: '#000', alignSelf: 'center', fontWeight: 'bold' }}>{'+'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => addItemToCart()} style={{ width: '80%', height: AdjustFontSize(30), borderRadius: 40, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#966AF8' }}>
                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '500', color: '#fff', alignSelf: 'center' }}>{'Add to cart'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: AdjustFontSize(25), flexDirection: 'row', marginTop: AdjustFontSize(20), alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setDescription()} style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '400', color: selectDescription == true ? '#966AF8' : '#000', alignSelf: 'center' }}>{'Description'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAdditionalInformation()} style={{ flex: 1.3, justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '400', color: selectAdditionalInformation == true ? '#966AF8' : '#000', alignSelf: 'center' }}>{'Additional Information'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setReview()} style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(11), fontWeight: '400', color: selectReview == true ? '#966AF8' : '#000', alignSelf: 'center' }}>{'Reviews'}</Text>
                        </TouchableOpacity>
                    </View>
                    {selectDescription == true ?
                        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ededed', borderRadius: 10 }}>
                            <Text style={{ margin: AdjustFontSize(10), fontSize: AdjustFontSize(11) }}>{route.params.Product?.name}</Text>
                        </View> : null}
                    {selectAdditionalInformation == true ?
                        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ededed', borderRadius: 10 }}>
                            <Text></Text>
                        </View> : null}
                    {selectReview == true ?
                        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ededed', borderRadius: 10 }}>
                            <Text style={{ fontSize: AdjustFontSize(11), marginHorizontal: 10, marginTop: AdjustFontSize(10) }}>{'There are no reviews yet.'}</Text>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: 'bold', marginTop: 10, marginHorizontal: 10 }}>{`Be the first to review  ${route.params.Product?.name}.`}</Text>
                            <Text style={{ fontSize: AdjustFontSize(11), marginHorizontal: 10, marginTop: AdjustFontSize(10) }}>{'Your email address will not be published. Required fields are marked *'}</Text>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>{getProductRating()}
                                <Text style={{ fontSize: AdjustFontSize(11), fontWeight: 'bold', color: '#000', alignSelf: 'center' }}>{'Your Rating'}</Text>
                                <Text style={{ fontSize: AdjustFontSize(11), fontWeight: 'bold', color: 'red', alignSelf: 'center' }}>{'*'}</Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 5 }}>{Product_Rating_Bar}</View>
                            </View>
                            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: AdjustFontSize(11), fontWeight: 'bold', color: '#000', alignSelf: 'center' }}>{'Your Review'}</Text>
                                    <Text style={{ fontSize: AdjustFontSize(11), fontWeight: 'bold', color: 'red', alignSelf: 'center' }}>{'*'}</Text>
                                </View>
                                <View style={{ marginVertical: AdjustFontSize(10), borderRadius: 10, backgroundColor: '#fff', height: AdjustFontSize(80) }}>
                                    <TextInput style={{ margin: 5, paddingHorizontal: 10, fontSize: AdjustFontSize(11), color: '#000' }}
                                        placeholder="Write Review..."
                                        multiline={true}
                                        keyboardType="default"
                                    />
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    <TouchableOpacity style={{ width: '25%', height: AdjustFontSize(30), backgroundColor: '#966AF8', borderRadius: 5, justifyContent: 'center' }}>
                                        <Text style={{ color: '#fff', fontSize: AdjustFontSize(11), alignSelf: 'center' }}>{'Submit'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> : null}
                </View>
            </VirtualizedScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    imagestyle: {
        height: imageResizerObj.getHeight(2500),
        width: imageResizerObj.getWidth(1600),
        resizeMode: 'cover'
    }
})