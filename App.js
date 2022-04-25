import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {AddTodoScreen,MoreTodo,FiusdScreen,CoinScreen,CarScreen,AddRepetition,Repetition,Birth,AddBirth,About} from './screens';
import {AppContext,BottomTab} from './copmonent'
import ReactNativeAN from 'react-native-alarm-notification';
import * as shamsi from 'shamsi';
import Realm from "realm";
import {AppState} from 'react-native'
const Stack = createStackNavigator();




const TODO_SCHEMA = 'Todo1'
const TodoSchema = {
    name : TODO_SCHEMA,
    primaryKey : 'id',
    properties : {
        id : 'int',
        title : {type : 'string', indexed : true},
        description : 'string',
        createtionDate : 'string',
        done : {type : 'bool', default : false},
        showTimeItem : {type : 'bool', default : false},
        time : "string"
    }
}
const databaseOption = {
  path : 'todoListApp.realm',
  schema : [TodoSchema]
}

const App = (props) =>{
  const [time, setTime] = useState(new Date())
  const [alert,setAlert]=useState(false)
  const [cheang,setCheang]= useState(false)
  const [id,setId] = useState(Math.floor(Math.random() * 10000) + 1)
  const [dataValue,setDataValue] = useState([])
  const [title, setTitleinput] = useState('')
  const [description, setDescription] = useState('')
  const [date,setDate] = useState('')
  const [help,setHelp] = useState(false)
  const [showTimeItem,setShowTimeItem]=useState(false)

  useEffect(()=>{
    App1()
  }, [cheang])




  // console.log("======================================>",)


  const dataSchema = {
            title : title,
            description : description,
            createtionDate : date,
            id : id,
            done : false,
            showTimeItem : false,
            time : time.toLocaleTimeString()
            
          }

useEffect(()=>{
  setCheang(!cheang)

},[alert])




var checkdate = new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate()
var arrlength= dataValue.length == 1 ? dataValue.length -1 : dataValue.length -2
const [count, setCount]=useState(0)

const AddData = ()=>{
 dataValue.forEach(i => {
  const alarmNotifData = {
    	
    id: Math.floor(Math.random() * 100000),
    snooze_interva:[60],
    repeat_interval : "minutely",
    channel: "1234",
    auto_cancel: true,                            
    vibrate: true,
    vibration: 100,                               
    large_icon: "ic_launcher",
    play_sound: true,
    sound_name: null,                             
    color: "aqua",
    tag: 'some_tag',
    data: { foo: "bar" },
    has_button : true
};
  console.log(i)
  setCount(count + 1)

 if (i.createtionDate != "") {
        console.log("setAlarm")
        let dateMiladi = i.createtionDate.split('/')
        if (dateMiladi != "") {
          if (dateMiladi[1][0]==0) {
            var month = dateMiladi[1].slice(1,2)
          }else if (dateMiladi[1][0]!=0) {
          var month = dateMiladi[1]

          } 

          if (dateMiladi[2][0]==0) {
            var roze = dateMiladi[2].slice(1,2)
          }else if (dateMiladi[2][0]!=0) {
              var roze = dateMiladi[2]

          } 
          var Miladi = shamsi.jalaliToGregorian(Number(dateMiladi[0]),Number(month),Number(roze)).join('/')
          var DateMiladi = Miladi.split("/")

        }

        
        
          const fireDate = `${DateMiladi[2]}-${DateMiladi[1]}-${DateMiladi[0]} ${i.time}`;			
          var alarm =  ReactNativeAN.scheduleAlarm({ ...alarmNotifData, title: i.title ,message: i.description, fire_date: fireDate,});
          console.log("alarmNotifData",alarmNotifData.id)
          let DATE = new Date()
    
          // console.log("Miladi===============>",i.time)

        }



   console.log("count",count)
   console.log("time",i.time)


 })
  
}

useEffect(()=>{
 AddData()
},[])

  const Data= {
    

    newsend : ()=>{ ReactNativeAN.sendNotification(alarmNotifData)},

  
    
  deleteAllAlarm : ()=>{ReactNativeAN.removeAllFiredNotifications(),console.log("delete All notif")},




TodoSubmittiing : () =>{
  setId(Math.floor(Math.random() * 10000) + 1)
  new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, dataSchema)
            resolve(dataSchema)
        })
    }).catch(err => reject(err))
})



},


UpdateItemDone : (data) => {
    new Promise((resolve,reject)=>{
        Realm.open(databaseOption).then(realm => {
           realm.write(() => {
               let updateTodoItem = realm.objectForPrimaryKey(TODO_SCHEMA, data.id)
               updateTodoItem.done = data.done
               updateTodoItem.count = data.count

               resolve()
           })
           setCheang(!cheang)


        }).catch(err => reject(err))
    })
},

SetAlarm : (data)=>{
  console.log(data)
  const alarmNotifData = {
    	
    id: Math.floor(Math.random() * 100000),
    snooze_interva:[60],
    repeat_interval : "minutely",
    channel: "1234",
    auto_cancel: true,                            
    vibrate: true,
    vibration: 100,                               
    large_icon: "ic_launcher",
    play_sound: true,
    sound_name: null,                             
    color: "aqua",
    tag: 'some_tag',
    data: { foo: "bar" },
    has_button : true
};
  setCount(count + 1)

 if (data.date != "") {
        console.log("setAlarm")
        let dateMiladi = data.date.split('/')
        if (dateMiladi != "") {
          if (dateMiladi[1][0]==0) {
            var month = dateMiladi[1].slice(1,2)
          }else if (dateMiladi[1][0]!=0) {
          var month = dateMiladi[1]

          } 

          if (dateMiladi[2][0]==0) {
            var roze = dateMiladi[2].slice(1,2)
          }else if (dateMiladi[2][0]!=0) {
              var roze = dateMiladi[2]

          } 
          var Miladi = shamsi.jalaliToGregorian(Number(dateMiladi[0]),Number(month),Number(roze)).join('/')
          var DateMiladi = Miladi.split("/")

        }

        console.log(data.time.toLocaleTimeString())
        
          const fireDate = `${DateMiladi[2]}-${DateMiladi[1]}-${DateMiladi[0]} ${data.time.toLocaleTimeString()}`;			
          var alarm =  ReactNativeAN.scheduleAlarm({ ...alarmNotifData, title: data.title ,message: data.description, fire_date: fireDate,});
          console.log("alarmNotifData",alarmNotifData.id)
          let DATE = new Date()
    

        }
},

ShowTimeItem : (dataa) => {
  console.log("dataa=>>>>>>>>>>>>>",dataa)
  new Promise((resolve,reject)=>{
      Realm.open(databaseOption).then(realm => {
         realm.write(() => {
             let updateTodoItem = realm.objectForPrimaryKey(TODO_SCHEMA, dataa.id)
             updateTodoItem.showTimeItem = dataa.showTimeItem
             resolve()
         })


      }).catch(err => reject(err))
  })
},

 DeleteAllItem : () => {
  new Promise((resolve, reject) => {
      Realm.open(databaseOption).then(realm => {
          realm.write(() => {
              let deleteTodo = realm.objects(TODO_SCHEMA)
              realm.delete(deleteTodo)
              resolve()
          })
      }).catch(err => reject(err))
  })
},

DeleteItem : (id) => {
  new Promise((resolve, reject) => {
      Realm.open(databaseOption).then(realm => {
          realm.write(() => {
              let deleteTodo = realm.objectForPrimaryKey(TODO_SCHEMA, id)
              realm.delete(deleteTodo)
              resolve()
          })
      }).catch(err => reject(err))
  })
},


  
UpdateTime : (data) => {
  new Promise((resolve,reject)=>{
      Realm.open(databaseOption).then(realm => {
         realm.write(() => {
             let updateTodoItem = realm.objectForPrimaryKey(TODO_SCHEMA, data.id)
             updateTodoItem.time = data.time
             resolve()
         })

      }).catch(err => reject(err))
  })
},

UpdateItem : (data) => {
  new Promise((resolve,reject)=>{
      Realm.open(databaseOption).then(realm => {
         realm.write(() => {
             let updateTodoItem = realm.objectForPrimaryKey(TODO_SCHEMA, data.id)
             updateTodoItem.description = data.description
             updateTodoItem.title = data.title

             resolve()
         })

      }).catch(err => reject(err))
  })
},


datenow : shamsi.gregorianToJalali(new Date().getFullYear(),new Date().getMonth()+1,new Date().getUTCDate()),

title, setTitleinput,
description, setDescription,
date, setDate,
dataValue,
alert,setAlert,
cheang,setCheang,
time,setTime,id,
setCount,setId,
AddData,
help,setHelp,
showTimeItem,setShowTimeItem,

 
  }

const App1=()=>{
  new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        var allTodo = realm.objects(TODO_SCHEMA)
        setDataValue(allTodo)
        resolve(allTodo)
        // console.log("allTodo=>",allTodo)


    }).catch(err => reject(err))
})
}

// در پس زمینه
useEffect(() => {
  AppState.addEventListener('change', handleAppStateChange);
  
}, []);

const handleAppStateChange = (nextAppState) => {
  // console.log('App State: ' + nextAppState)
  if (nextAppState === "background"){
    AddData()
  } 
}


// AddData()

useEffect(()=>{
setTimeout(() => {
  AddData()
}, 1000);
}, [cheang])


  return(
      <NavigationContainer>
        <AppContext.Provider value={Data}>
          <Stack.Navigator
            screenOptions={{
              headerShown : false
            }}
          >      
              <Stack.Screen name="Home" component={BottomTab} />
              <Stack.Screen name="AddTodo" component={AddTodoScreen} />
              <Stack.Screen name="MoreTodo" component={MoreTodo} />
              <Stack.Screen name="FiusdScreen" component={FiusdScreen} {...props}/>
              <Stack.Screen name="coinScreen" component={CoinScreen} {...props}/>
              <Stack.Screen name="carScreen" component={CarScreen} {...props}/>
              <Stack.Screen name="AddRepetition" component={AddRepetition} {...props}/>
              <Stack.Screen name="Repetition" component={Repetition} {...props}/>
              <Stack.Screen name="Birth" component={Birth} {...props}/>
              <Stack.Screen name="AddBirth" component={AddBirth} {...props}/>
              <Stack.Screen name="About" component={About} {...props}/>






          </Stack.Navigator>
        </AppContext.Provider>
      </NavigationContainer>
  )
}

export default App;