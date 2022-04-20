import React,{useState,useEffect,useContext} from "react"
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Pressable,ToastAndroid} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NumericInput from 'react-native-numeric-input'
import {Picker} from '@react-native-picker/picker';
import { AppContext } from '../copmonent/contextComponent'

const AddRepetition = (props) => {
    const {datenow}=useContext(AppContext)
    const [id,setId] = useState(Math.floor(Math.random() * 10000) + 1)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [time,setTime]=useState(0)
    const [type,settype]=useState("minute")

switch (type) {
    case "minute":
        var label = "دقیقه"
        break;
    case "hour":
        var label = "ساعت"
        break;
    case "day":
        var label = "روز"
        break;
    case "week":
        var label = "هفته"
        break;
    case "month":
        var label = "ماه"
        break;
    default:
        var label = ""
        break;
}


console.log(id)
return(
    <View style={styles.container}>
        <View style={{flexDirection : "row",justifyContent : "space-between"}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Repetition")}}
                 style={{margin : 20}}>
                <AntDesign name="back" color="#fff" size={20}/>
            </TouchableOpacity>
            <Text style={{color : "#fff",fontSize : 20,margin : 15}}>ADD</Text>
        </View>

        <View style={styles.inputBox}>
            <View>
                <TextInput  color="#fff" placeholder="عنوان" placeholderTextColor="#fff" style={styles.input} onChangeText={(value) =>setTitle(value)} value={title}/>
                <TextInput color="#fff" placeholderTextColor="#fff" multiline numberOfLines={3} placeholder="متن پیام" style={styles.input} onChangeText={(value) =>setDescription(value)} value={description}/>
            </View>
            <View style={{flexDirection : "row",justifyContent : "space-around"}}>
                 {/* <TextInput keyboardType="decimal-pad" color="#fff" placeholderTextColor="#fff"  placeholder="هر چند ساعت ؟" style={[styles.input,{width : "40%"}]} onChangeText={(value) =>setTime(value)} value={time}/> */}
                 {/* <TextInput keyboardType="decimal-pad" color="#fff" placeholderTextColor="#fff"  placeholder="تا چند روز ؟" style={[styles.input,{width : "40%"}]} onChangeText={(value) =>settype(value)} value={type}/> */}
                    <View style={{flexDirection : "column",marginTop : "10%",width : "100%"}}>

                    <View style={{flexDirection : "row",width : "100%",justifyContent : "space-between"}}>
                        <Text style={{color : "#fff",marginRight : 20,fontSize : 15,fontWeight : "600"}}>به چه صورت یادآوری شود</Text>
                        <Picker style={{width : "40%",height :20,backgroundColor :"#957bff",}}
                            mode="dropdown"
                            selectedValue={type}
                            itemStyle={{textAlign:'center',}}
                            onValueChange={(itemValue, itemIndex) => settype(itemValue)} >
                                <Picker.Item label="دقیقه" value="minute"  />
                                <Picker.Item label="ساعت" value="hour" />
                                <Picker.Item label="روز" value="day" />
                                <Picker.Item label="هفته" value="week" />
                                <Picker.Item label="ماه" value="month" />   
                        </Picker>
                        </View>

                        <View style={{flexDirection : "row",width : "100%",justifyContent : "space-between",marginTop : "10%"}}>
                            <Text style={{color : "#fff",marginRight : 20,fontSize : 15,fontWeight : "600"}}>هر چند {label} یادآوری شود</Text>
                        <NumericInput 
                            value={time} 
                            onChange={value => setTime(value)} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={120} 
                            totalHeight={40} 
                            iconSize={25}
                            step={1}
                            minValue={0}
                            valueType='real'
                            rounded 
                            textColor='#fff' 
                            iconStyle={{ color: 'white' }} 
                            rightButtonBackgroundColor='#4d57e5' 
                            leftButtonBackgroundColor='#957bff'/>
                        </View>
                    </View>

                    
            </View>
        </View>

          
                <Pressable 
                style={styles.SaveBotton}
                
                onPress={()=>{
                    if (title &&  description != '' && time != 0) {
                        const item = {
                            title : title,
                            description : description,
                            time : time,
                            type : type,
                            id : id,
                            newtime : new Date().toLocaleTimeString(),
                            newdate : datenow[0]+"/"+datenow[1]+"/"+datenow[2]
                        }
                       props.navigation.navigate("Repetition",{values : item})
      
                    }else {
                        ToastAndroid.show("مقادیر کامل وارد کنید", ToastAndroid.SHORT)
                    }           
               }}
            >
                    <MaterialIcons name="save-alt" size={25} color="#fff"/>
            </Pressable> 
            
    </View>
)
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        backgroundColor : '#170829'

    },
    inputBox : {
        flex : 10,
        backgroundColor : "#170829",
        marginTop : 5,
        borderRadius : 10,
        paddingBottom : 10,
    },
    input : {
        width : "100%",
        alignSelf : "center",
        backgroundColor : "#463852",
        borderRadius : 15,
        marginTop :15
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
})

export{AddRepetition}