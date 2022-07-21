import React, { useState,useEffect} from 'react';
import {View ,Text ,StyleSheet,FlatList,TouchableOpacity,Image,TextInput,RefreshControl,Pressable} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';
import { SvgCssUri } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';

const FiScreen = (props)=>{
    const [datausd,setDatausd] =useState('')
    const [dataarze,setDataarze] =useState([])
    const [dataarzeseaech,setDataarzesearch] =useState([])
    const [cheng,setCheng] =useState(false)
    const [text,setText]= useState("")
    const [itemm,setItem]= useState([])
    const [showadd,setShowadd]= useState(false)
    const [name,setName]= useState('')


    const adiveryAppId = "99dd12e3-9c38-4c6a-9c88-a886e5c60d1f";
    Adivery.configure(adiveryAppId);
    const placementBanner = "c9068ba9-161a-4370-8287-5a0673b40ef3"
    

useEffect(()=>{
    setTimeout(() => {
        setCheng(!cheng)
    }, 2000);
},[])
console.log(cheng)

// غلاقه مندی های ارز
useEffect(()=>{
    if (itemm != 0) {
        axios({
            url : `https://api.nomics.com/v1/currencies/ticker?key=55b206eb3006b1562709236b3fb04f1492bce852&ids=${String(itemm)}&interval=1d,30d&per-page=100`,
            method : "GET",
            responseType : "json",          
        }) 
        .then((res) => { 
            setDataarzesearch(res.data)
                }).catch((err)=>{
    
            console.log("Eroooooor",err)
                })
    }
    
    },[cheng])

// گرفتن علاقه مندی ها
useEffect(() => {
    const current = async () => {
    const value = await AsyncStorage.getItem('add')
    if (value != null)
        setItem(JSON.parse(value))
    }
    current()

    }, [cheng])

// ذخیره در علاقه مندی ها   
const  setlink = async (name) =>{
    try {
        if (name !="") {
        const lint= [...itemm,name.toUpperCase()]
        setItem(lint);
        await AsyncStorage.setItem('add',JSON.stringify(lint) )
        setCheng(!cheng)
        }
        } catch (error) {
            console.log(error)
        }
    }
// دلیلیت علاقه مندی ها
const Delete =(value,item)=>{
    let number = dataarzeseaech.findIndex(data => data.symbol.includes(item.symbol))
    let numberitem = itemm.findIndex(data => data.includes(item.symbol))
    console.log(value +"   "+ item.symbol +"   "  + number)
    let newitem = itemm.splice(numberitem,1)
    let sss = dataarzeseaech.splice(number,1)
    // setDataarzesearch(sss)
    AsyncStorage.setItem('add',JSON.stringify(itemm) )
    setCheng(!cheng)
    }


// console.log(itemm)
// قیمت دلار
useEffect(()=>{
    fetch("https://www.megaweb.ir/api/money")
    .then((res)=> res.json())
    .then((data)=> setDatausd(data))

},[cheng])


// کل ارز های دیجیتال
 useEffect(()=>{         
    axios({
        url : "https://api.nomics.com/v1/currencies/ticker?key=55b206eb3006b1562709236b3fb04f1492bce852&interval=1d,7d&per-page=100&page=1",
        method : "GET",
        responseType : "json",          
    }) 
    .then((res) => { 
        setDataarze(res.data)
            }).catch((err)=>{

        console.log("Eroooooor",err)
            })
 },[])


// تبدیل گیومه دلار به نقطه
let aaa = datausd.buy_usd
try {
    var usd = aaa.price.replace(",",".")
} catch (error) {    
}
// console.log(usd)


// سرچ کردن ارز
if (dataarze != "") {
    var Search = dataarze.filter(data => data.id.includes(text.toUpperCase()));

}

// رفرش کردن
const [refreshing, setRefreshing] = useState(false);
const onRefresh =() => {
    setRefreshing(true);
    setCheng(!cheng)
setTimeout(() => {
    setRefreshing(false);
}, 1000);
}

// جداکردن اعدااد 3 رقم 3 رقم
function addComma( str ) {
	var objRegex = new RegExp( '(-?[0-9]+)([0-9]{3})' );
 
	while( objRegex.test( str ) ) {
		str = str.replace( objRegex, '$1,$2' );
	}
 
	return str;
}
    
// let eeee = dataarze[0]

// console.log(eeee.replace("d", "ali"))

    return(
        <View style={{flex : 1,backgroundColor : "#170829"}}>
            <View style={{flexDirection :"row",alignSelf :"center"}}>
                <TextInput style={{width : "90%",backgroundColor :"#5555",borderRadius :5,}} placeholderTextColor="#fff" color="#fff" placeholder='جستجو' value={text} onChangeText={(value)=>{setText(value)}}/>   
                <AntDesign style={{position :"absolute",right : "3%",top : "25%"}} name="search1" color="#fff" size={22}/>
            </View>
            <View style={{flexDirection : "row",width : "100%",height :40,backgroundColor :"#1115",justifyContent : "space-around",alignItems :"center"}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('FiusdScreen')}}>
                      <Text style={[styles.textoption,{backgroundColor :"#5552",}]}>ارز</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.textoption}  onPress={()=>{props.navigation.navigate('coinScreen')}}>
                      <Text style={[styles.textoption,{backgroundColor :"#5552",}]}>طلا سکه</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.textoption} onPress={()=>{props.navigation.navigate('carScreen')}}>
                      <Text style={[styles.textoption,{backgroundColor :"#5552",}]}>خودرو</Text>
                </TouchableOpacity> */}
                      <Text style={[styles.textoption,{backgroundColor :"#5559",}]}>ارز دیجیتال</Text>
            </View>

            <View style={{flex : 1,justifyContent : "center",alignItems : "center",height :"100%",padding : "10%"}}>
                   <AdiveryBanner  placementId={placementBanner} bannerSize={Banner}/>
            </View>
            
                {
                    dataarze != "" ? 
                    <TouchableOpacity 
                        onPress={()=>{setShowadd(true)}}
                        style={styles.plus}>
                            <AntDesign name='plus' color="#fff" size={15}/>
                    </TouchableOpacity> :<View/>
                }

            
        {
            dataarzeseaech.length != 0 ?
                <Text style={{color : "#fff",fontSize :18,marginLeft : 20,marginRight : 20}}>Follow</Text>
                :<View/>
        }
        
    <FlatList style={{height : dataarzeseaech.length != 0 ? dataarzeseaech.length >= 2  ? "60%" : "25%"  : "0%" }}
        refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />}
    data={dataarzeseaech}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item,index }) => {
    let rrr = item.price * usd
    let aaa = Math.round(rrr*1000)
    let image = item.logo_url.includes("svg")
    let rial = addComma(String(aaa))
    return (
        <View style={{flex : 1}}>
            
 
        {/* <TouchableOpacity onPress={()=>{setShowmore(true),setDatashowmore(item)}}> */}
                 <View style={styles.item}>
                     <View>
                     </View>
                     <View style={{padding : 10,flex : 1}}>                   
                         <View style={{flexDirection :"row-reverse"}}>
                             <Text style={{fontSize : 20,color : "gold",}}>{item.name}</Text>
                             <Text style={{fontSize : 15,color : "gray",marginRight : 5,backgroundColor : "#5555",borderRadius : 5,padding : 2}}>{item.id}</Text>
                         </View>
                         <Text style={{fontSize : 20,color : "#fff" ,alignSelf :"flex-end"}}>{item.price} $</Text>
                         <Text style={{fontSize : 15,color : "#fff",alignSelf :"flex-end"}}>﷼ {rial}</Text>
                     </View>
                     <View style={{flex : 1,justifyContent : "center",marginLeft : -15}}>
                         <TouchableOpacity hitSlop={{top : 10,left : 10,bottom : 10,right : 10}} onPress={()=>{Delete(index,item)}}
                             style={{position  : "absolute",bottom : 5,left : 25}}>
                            <AntDesign name='delete' color="red" size={15}/>
                         </TouchableOpacity>
                         {
                             image == true ? 
                                 <SvgCssUri
                                 width="60%"
                                 height="60%"
                                 uri= {item.logo_url}
                              /> : 
                                      <Image style={{width : 70,height : 70,alignSelf :"center",borderRadius : 50,marginLeft: "-30%"}} resizeMode= "cover" source={{uri: item.logo_url}}/>
                             }
                     </View>
                 </View>
        {/* </TouchableOpacity> */}
     
                     </View>
    )
    }}
                                
    />
     {
         dataarze != "" ? 
            <Text style={{color : "#fff",fontSize :18,marginLeft : 20,marginRight : 20}}>All</Text>:<Text></Text>
     }

    <FlatList
              refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
          data={Search == "" ? dataarze : Search}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {
            let rrr = item.price * usd
            let aaa = Math.round(rrr*1000)
            let image = item.logo_url.includes("svg")
            let rial = addComma(String(aaa))
            
            return (
                <View style={{flex : 1}}>

   {/* <TouchableOpacity onPress={()=>{setShowmore(true),setDatashowmore(item)}}> */}
            <View style={styles.item}>
                <View style={{padding : 10,flex : 1}}>
                    <View style={{flexDirection :"row-reverse"}}>
                        <Text style={{fontSize : 20,color : "gold",}}>{item.name}</Text>
                        <Text style={{fontSize : 15,color : "gray",marginRight : 5,backgroundColor : "#5555",borderRadius : 5,padding : 2}}>{item.id}</Text>
                    </View>
                    <Text style={{fontSize : 20,color : "#fff" ,alignSelf :"flex-end"}}>{item.price} $</Text>
                    <Text style={{fontSize : 15,color : "#fff",alignSelf :"flex-end"}}>﷼ {rial}</Text>
                </View>
                <View style={{flex : 1,justifyContent : "center",marginLeft : -15}}>
                    {
                        image == true ? 
                            <SvgCssUri
                            width="60%"
                            height="60%"
                            uri= {item.logo_url}
                         /> : 
                                 <Image style={{width : 70,height : 70,alignSelf :"center",borderRadius : 50,marginLeft: "-30%"}} resizeMode= "cover" source={{uri: item.logo_url}}/>
                        }
                </View>
            </View>
   {/* </TouchableOpacity> */}
            
                </View>
        
            )
          }}
                                     
          />

  
{
    dataarze == "" ?
                <View style={{position : "absolute",top : "44%",right : "42%",alignItems :"center"}}>
                    <CirclesLoader  size={50} color="red" />
                    <TextLoader textStyle={{color :"#fff",left : 8}} />
                </View> :<View/>
}

{
    showadd == true ? 
    <View style={styles.showplus}>
    <View style={styles.header_showplus}>
        <Text style={{fontSize : 18,fontWeight : "600", color: "#fff",marginRight : 10}}>Add</Text>
        <Pressable onPress={()=>{setShowadd(false)}}>
           <AntDesign style={{marginLeft : 10}} name="close" size={25} color="red"/>
        </Pressable>
    </View>

    <View style={{justifyContent :"space-around"}}>
        <TextInput placeholder="  add name"   placeholderTextColor="#fff" style={styles.text_showplus} color="#fff" value={name} onChangeText={(value)=>{setName(value)}}/>
            <Pressable onPress={()=>{setlink(name),setName(""),setShowadd(false)}}
                style={styles.bottom_showplus}>
                <AntDesign style={{marginLeft : 10,alignSelf :  "center"}} name="downcircle" size={25} color="#999"/>
            </Pressable>
    </View>
</View> : <View/>
}

        </View>
    )
}
const styles = StyleSheet.create({
    item :{
        width : "90%",
        height : 100,
        backgroundColor :"#3763",
        margin : 10,
        alignSelf : "center",
        borderRadius : 10,
        flexDirection :"row-reverse",
        justifyContent : "space-between"
        
    },
    showplus :{
        position : "absolute",
         backgroundColor : "#555",
         width : "90%",
         height : 200 ,
         borderRadius : 10,
         alignSelf : "center",
         justifyContent : "space-between",
         borderWidth : 2,
         borderColor : "#fff",
         top : "40%"
    },
    header_showplus : {
        flexDirection : "row-reverse",
        justifyContent : "space-between",
        backgroundColor : "#8763",
        width : "100%",
        height : "20%",
        borderBottomLeftRadius : 8,
        borderBottomRightRadius : 8,
        alignItems : "center"
       },
       text_showplus : {
        backgroundColor : "#444",
        width : "95%",
        height : 80,
        alignSelf : "center",
        borderRadius : 5,
        borderWidth : 1,
        borderColor : "#000"
     },
       bottom_showplus : {
        backgroundColor : "#603fab",
        width : "95%",
        height : "25%",
        alignSelf : "center",
        borderRadius : 7,
        marginBottom : 8,
        justifyContent : "center"
    },
    showmore :{
        width : "80%", 
        height : "60%",
        backgroundColor :"#111",
        position : "absolute",
        top : "20%",
        left : "10%",
        borderRadius : 5,
        borderWidth : 2,
    },
    textoption : {
        fontSize : 18,
        color :  "#fff",
        width : 80,
        height : 30,
        textAlign :"center",
        borderRadius : 5,
    
    },
    plus : {
        width : 25,
        height : 25,
        borderRadius : 25,
        backgroundColor : "#5555",
        borderWidth  : 1,
        borderColor : "#fff",
        justifyContent : "center",
        alignItems : "center",
        alignSelf : "center",
        zIndex : 1
    }
})
export {FiScreen}