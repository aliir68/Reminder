import React,{useState,useContext, useEffect} from 'react'
import { StyleSheet, View, Text,Pressable, TextInput,Switch,ToastAndroid } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AppContext} from '../copmonent'
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';

const TodoContent = (props)=>{
    const {title, setTitleinput,description, setDescription,date,
         setDate,TodoSubmittiing,cheang,setCheang,time,setTime,datenow,id,ShowTimeItem} = useContext(AppContext)
    const [switchAlarm,setSwitchAlarm]=useState(false)
    const [modal,setModal]=useState(false)
    const [isVisablePicker, setIsVisiblePricker] = useState(false);
 
    const interstitialPlacement = "55c7e6aa-ac8e-44b6-b1b6-66fdb2737384";
    Adivery.prepareInterstitialAd(interstitialPlacement);

    // موارد تایپ شده در این استیت ها ذخیره میشه
    const TitleChenged = (value) =>{
        setTitleinput(value)
    }
    // مارد تایپ شده ست میکنیم در استیت به وسیله تکس این پ.ت
    const DescriptionChenged = (value) =>{
        setDescription(value)
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

const adiveryAppId = "99dd12e3-9c38-4c6a-9c88-a886e5c60d1f";
Adivery.configure(adiveryAppId);
const placementBanner = "c9068ba9-161a-4370-8287-5a0673b40ef3"


var datepickernew= `${datenow[0]}/${datenow[1]}/${datenow[2]}`
    return(
        <View style={styles.container}>
                <View style={styles.inputBox}>
                        <View>
                            <TextInput color="#fff" placeholder="عنوان" placeholderTextColor="#fff" style={styles.input} onChangeText={(value) =>TitleChenged(value)} value={title}/>
                            <TextInput color="#fff" placeholderTextColor="#fff" multiline numberOfLines={5} placeholder="متن پیام" style={styles.input} onChangeText={(value) =>DescriptionChenged(value)} value={description}/>
                            
                            <View style={{justifyContent : "center"}}> 
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
                            <View>
                            <Text style={{fontSize : 13,color : "red",top : 10}}>اگر تاریخ ساعت تنظیم نشود تاریخ ساعت امروز تنظیم خواهد شد</Text>
                                <View style={{flexDirection : "row"}}>
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
                           
                        
                                            
                           <View style={{flex : 3,alignItems : "center"}}>
                                <AdiveryBanner placementId={placementBanner} bannerSize={Banner}/>
                            </View>
                            {
                                
                              title &&  description != '' ?
                                <Pressable 
                                style={styles.SaveBotton}
                                
                                onPress={()=>{
                                  
                                    TodoSubmittiing()
                                    const dataa = {
                                        id : id,
                                        showTimeItem : switchAlarm === true ? true : false
                                    }
                                    ShowTimeItem(dataa)
                                    props.navigation.navigate('Home')
                                    setTitleinput('')
                                    setDescription('')
                                    setCheang(!cheang)

                                  
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
        flex : 10,
        padding : 10,
        backgroundColor : '#170829',
        

    },
    inputBox : {
        flex : 10,
        backgroundColor : "#170829",
        marginTop : 5,
        borderRadius : 10,
        paddingBottom : 10,
    },
    inputdate :{
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
        marginTop :15,
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
    } 

})
export {TodoContent}