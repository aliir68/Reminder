import React,{useState,useContext, useEffect} from 'react'
import { StyleSheet, View, Text,Pressable, TextInput,Switch,TouchableOpacity,Image,ToastAndroid} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AppContext} from '../copmonent'
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text'
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';


const AddBirth =(props)=>{
    const {SetAlarm,datenow} = useContext(AppContext)
    const [switchAlarm,setSwitchAlarm]=useState(false)
    const [modal,setModal]=useState(false)
    const [isVisablePicker, setIsVisiblePricker] = useState(false);
    const [description,setDescription] = useState('')
    const [title,setTitle] = useState('')
    const [date,setDate] = useState('')
    const [datebirth,setDatebirth] = useState('')
    const [time,setTime] = useState(new Date())
    const [image,setImage] = useState('')
    const [month,setMonth] = useState('')
 
    const interstitialPlacement = "55c7e6aa-ac8e-44b6-b1b6-66fdb2737384";
    Adivery.prepareInterstitialAd(interstitialPlacement);
    
console.log(time.toLocaleTimeString())
//   const focus = () => {
//     if (!dateInput) {
//       return;
//     }
 
//     dateInput.focus();
//   };


console.log("==>",image)


const handleimage = ()=>{
    const options = {}
    launchImageLibrary(options,response =>{
    try {
        console.log(response.assets[0].uri)
        if (response.assets[0].uri) {
            setImage(response.assets[0].uri)
        }
    } catch (error) {
        alert("عکس ثبت نشد")
    }
    })

    
}


const showModal = () => {
setIsVisiblePricker(!isVisablePicker)
}

const handleConfirm = (value) => {
setTime(value)
date === "" ? setDate(datepickernew) : date
showModal()
}

useEffect(()=>{
setDate(datepickernew)
},[])

var datepickernew= `${datenow[0]}/${datenow[1]}/${datenow[2]}`


    return(
        <View style={styles.container}>
            <View style={{flexDirection : "row",justifyContent : "space-between"}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate("Birth")}}
                    style={{margin : 20}}>
                    <AntDesign name="back" color="#fff" size={20}/>
                </TouchableOpacity>
                <Text style={{color : "#fff",fontSize : 20,margin : 15}}>Add Birth</Text>
            </View>   

                <View style={styles.inputBox}>
                        <View>
                            <View>
                                <TouchableOpacity onPress={handleimage}
                                                style={styles.image}>

                                        {
                                            image == "" ?
                                            <Text style={{fontSize : 20,color : "#899"}}>یک عکس وارد کنید</Text> : <View/>
                                        }
                                            {
                                                image != "" ? 
                                                    <Image source={{uri : image}} style={{width : "100%",height : "100%"}} resizeMode= "cover"/>
                                                            : <View/>
                                            }

                                            {
                                                image != "" ?                                    
                                                <TouchableOpacity onPress={()=>{setImage('')}}
                                                style={{width : 50,height : 50,position : "absolute",right : 10,top : 13}}>
                                                        <AntDesign name='closecircleo' size={20} color="red"/>
                                                </TouchableOpacity> : <View/>
                                            }

                                </TouchableOpacity>

                                <TextInput color="#fff" placeholder="نام" placeholderTextColor="#fff" style={styles.input} onChangeText={(value) =>setTitle(value)} value={title}/>
                                <TextInput color="#fff" placeholderTextColor="#fff" multiline numberOfLines={3} placeholder="پیام" style={styles.input} onChangeText={(value) =>setDescription(value)} value={description}/>
                                <View style={{flexDirection : "row",justifyContent : "space-around"}}>
                                <Picker style={{width : "30%",height :"50%",backgroundColor :"#463852",marginTop : 15,color : "#fff"}}
                                    mode="dropdown"
                                    selectedValue={month}
                                    itemStyle={{textAlign:'center',color : "#fff"}}
                                    onValueChange={(itemValue, itemIndex) => setMonth(itemValue)} >
                                        <Picker.Item label="فروردین" value="فروردین"  />
                                        <Picker.Item label="اردیبهشت" value="اردیبهشت" />
                                        <Picker.Item label="خرداد" value="خرداد" />
                                        <Picker.Item label="تیر" value="تیر" />
                                        <Picker.Item label="مرداد" value="مرداد" />   
                                        <Picker.Item label="شهریور" value="شهریور" />   
                                        <Picker.Item label="مهر" value="مهر" />   
                                        <Picker.Item label="ابان" value="ابان" />   
                                        <Picker.Item label="اذر" value="اذر" />   
                                        <Picker.Item label="دی" value="دی" />   
                                        <Picker.Item label="بهمن" value="بهمن" /> 
                                        <Picker.Item label="اسفند" value="اسفند" />   

                                </Picker>
                            
                                <TextInputMask style={[styles.input,{width : "30%",borderRadius : 0,height : "75%"}]}
                                    placeholder= "تاریخ تولد"
                                    placeholderTextColor = "#fff"
                                    color = "#fff"
                                    value={datebirth}
                                    onChangeText={(text) => setDatebirth(text)}
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY/MM/DD'
                                    }}
                                />                      
                                 {/* <TextInput color="#fff" placeholder="تاریخ تولد" placeholderTextColor="#fff" style={[styles.input,{width : "30%",borderRadius : 0,height : "75%"}]} onChangeText={(value) =>setTitle(value)} value={title}/> */}

                                </View>
                            </View>
                            <View style={{justifyContent : "center",top : -20}}> 
                                       <View style={{backgroundColor : "#463852",padding : 5,borderRadius : 10,marginTop : 10,
                                                    flexDirection : "row",justifyContent : "space-between"}}>
                                       <Text style={{color:"#fff",}}>اعلان فعال شود؟</Text>

                                            <Switch  
                                                            thumbColor={switchAlarm ? "green": "red"}
                                                            onValueChange={()=>{setSwitchAlarm(!switchAlarm)}}
                                                            value={switchAlarm}
                                                        />
                                       </View>
                                </View>

                        {
                            switchAlarm == true ?
                            <View style={{flex : 1}}>
                            <Text style={{fontSize : 13,color : "red",top : -10}}>اگر تاریخ ساعت تنظیم نشود تاریخ ساعت امروز تنظیم خواهد شد</Text>
                                <View style={{flexDirection : "row",top : 15}}>
                                <Pressable style={[styles.inputdate]}
                                    onPress={()=>{
                                        setModal(true)
                                    }}
                                    >
                                            <Text style={{color : "#fff"}}>Date: {date == "" ? datenow[0]+"/"+datenow[1]+"/"+datenow[2] : date}  </Text>
                                    </Pressable>
                                    <Pressable style={[styles.inputdate]}
                                    onPress={()=>{
                                        setIsVisiblePricker(true)
                                    }}
                                    >
                                            <Text style={{color : "#fff"}}>Time: {time.toLocaleTimeString()}</Text>
                                </Pressable>
                                </View>
                            </View>
                                    : <View/>
                        }
                            

                            
                        

                        </View>

                        </View>

                            {
                                modal == true ?
                                <View>
                                    <Pressable style={styles.close} hitSlop={{top : 20,left : 20,right : 20}}  onPress={()=>{setModal(false)}}>
                                         <MaterialIcons style={{}} name="close" size={30} color="red"/>
                                    </Pressable>
                                <DatePicker
                                style={{
                                    top : -80,
                                    width: '95%',
                                    height: '75%',
                                    alignSelf: 'center',
                                    backgroundColor: '#1e272e',
                                    borderWidth: 1,
                                    borderColor: '#4bcffa',
                                    borderRadius: 10,
                                    elevation: 4
                                }}
                                selected= {datepickernew}
                                dateSeparator='/'
                                minDate='1398/1/18'
                                maxDate='1405/1/18'
                                headerContainerStyle={{ height: '15%' }}
                                yearMonthBoxStyle={{
                                    
                                    width: '30%',
                                    height: '75%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderRadius: 10
                                }}
                                yearMonthTextStyle={{ fontSize: 22, color: '#4bcffa' }}
                                iconContainerStyle={{ width: `${100 / 7}%` }}
                                backIconStyle={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'center',
                                    tintColor: '#808e9b'
                                }}
                                nextIconStyle={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'center',
                                    tintColor: '#4bcffa'
                                }}
                                eachYearStyle={{
                                    width: 110,
                                    height: 82,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#4bcffa',
                                    marginTop: '1.5%',
                                    marginBottom: 5,
                                    marginHorizontal: '.5%',
                                    borderRadius: 10,
                                    elevation: 3
                                }}
                                eachYearTextStyle={{
                                    fontSize: 16,
                                    color: 'white'
                                }}
                                eachMonthStyle={{
                                    
                                    width: `${88 /3}%`,
                                    height: `${88 / 4}%`,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#4bcffa',
                                    marginBottom: '3%',
                                    borderRadius: 10,
                                    elevation: 3,
                                    padding : 20
                                }}
                                eachMonthTextStyle={{ fontSize: 16, color: 'white' }}
                                weekdaysContainerStyle={{ height: '10%' }}
                                weekdayStyle={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                weekdayTextStyle={{
                                    fontSize: 16,
                                    color: '#808e9b',
                                    marginBottom: 5
                                }}
                                borderColor='#4bcffa'
                                dayStyle={{
                                    width: `${100 / 7}%`,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    aspectRatio: 1 / 1
                                }}
                                selectedDayStyle={{
                                    width: '70%',
                                    aspectRatio: 1 / 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 100
                                }}
                                selectedDayColor='#4bcffa'
                                dayTextStyle={{ fontSize: 18 }}
                                selectedDayTextColor='white'
                                dayTextColor='#4bcffa'
                                disabledTextColor='#4bcffa66'
                                onDateChange={date => {setDate(date),setModal(false),showModal()

                                }}
                            /> 
                            </View> : <View/>
                  }
                            


                                <DateTimePickerModal 
                                        isVisible={isVisablePicker}
                                        mode="time"
                                        date={time}
                                        onConfirm={handleConfirm}
                                        onCancel={showModal}
                                        isDarkModeEnabled={true}
                                    />       



                            {

        
                                
                              title &&  description != '' ?
                                <Pressable 
                                style={styles.SaveBotton}
                                
                                onPress={()=>{

                                    if (switchAlarm === true) {
                                        const dataAlarm = {
                                            title : title,
                                            description : description,
                                            time : time,
                                            date : date,
                                        }
                                        SetAlarm(dataAlarm)
                                    }

                                    const data = {
                                        title : title,
                                        description : description,
                                        image : image,
                                        datebirth : datebirth,
                                        month : month,
                                        time : switchAlarm === true ?  time.toLocaleTimeString() : "",
                                        date : switchAlarm === true ? date : "یادآوری نمی شود"
                                    }
                                    props.navigation.navigate("Birth", {values : data})

                                    setTimeout(() => {
                                        Adivery.isLoaded(interstitialPlacement).then((isLoaded) => {
                                            if (isLoaded) {
                                            Adivery.showAd(interstitialPlacement);
                                            }
                                        });
                                    }, 1000);

                                }}
                            >
                                   <MaterialIcons name="save-alt" size={25} color="#fff"/>
                            </Pressable> : <Pressable onPress={()=>{ToastAndroid.show("مقادیر کامل وارد کنید", ToastAndroid.SHORT)}}
                                style={styles.SaveBotton}>
                                 <MaterialIcons name="save-alt" size={25} color="#fff"/>
                            </Pressable>
                            }
                             
                             
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        backgroundColor : '#170829',
        

    },
    inputBox : {
        flex : 1,
        backgroundColor : "#170829",
        marginTop : 5,
        borderRadius : 10,
        paddingBottom : 10,
    },
    inputdate :{
        flex : 1,
        height : 40,
        justifyContent : "space-around",
        alignItems : "center",
        flexDirection : "row",
        borderWidth : 2,
        borderStyle :"dashed",
        borderColor :"#fff",
        width : "45%",
        alignSelf : "center",
        backgroundColor : "#463852",
        borderRadius : 5,
        marginTop : -15,
        margin : 10
    },
    item : {
        fontWeight : "bold",

    }, 
    SaveBotton : {
        width :"100%",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#603fab",
        borderRadius : 10,
        alignSelf : "center",
        position : "absolute",
        bottom : 25,
        padding : 10,

    },
    introTitle : {
        fontWeight : "bold",
        fontSize : 16,
        padding : 10,
        backgroundColor : "#170829",
        borderRadius : 10,
        color: "#ffffff"
        
    },
    input : {
        width : "100%",
        alignSelf : "center",
        backgroundColor : "#463852",
        borderRadius : 15,
        marginTop :15
    },
    close : {
        width : 50,
        height : 50,
        position : "absolute",
        top : -110,
        left : -10
    } ,
    image :{
        width : "60%",
        height : "40%",
        alignSelf : "center",
        justifyContent : "center",
        borderWidth : 2,
        borderColor : "#fff",
        borderStyle :"dashed",
        alignItems : "center",
        backgroundColor : "#fff3",
        // bottom : "25%",
        // right : "-12%"

    }
  

 })

export{AddBirth}