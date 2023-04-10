import React, { useEffect, useState } from "react";
import { View, Text, Dimensions,Image,TouchableOpacity,TextInput} from "react-native";
import { db, setDoc, doc,collection, auth, getDocs,query, where,getDoc,addDoc,updateDoc} from "../firebase"


export default function Profile({navigation}) {
  const[data,setData]=useState([]);
  const { height, width } = Dimensions.get("window");
  const [modalVisible,setmodalVisible]=useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [dob, setDOB] = useState(null);
  useEffect(() => {
   
    ReadData();
  }, []);

  const ReadData=async()=>{
    var docRef = (collection(db, "user"));

   const  querySnapshot=await getDocs(docRef);
     
     
      querySnapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data());
            setEmail(doc.data().email)
            setName(doc.data().name)
            setDOB(doc.data().dob)
          });
      
    }

 

  const updateData=async()=>{
    const profileRef=doc(db,'user', auth.currentUser.uid)
    await updateDoc(profileRef,{
      name: name,
     email: email,
     dob:dob,
     userId:auth.currentUser.uid
    }).then(()=>{
      alert("Your Profile has been updated!")
    })
  }
  

  return (
   
      <View style={{ width: width, height: height, alignContent: 'center',}}backgroundColor="white">
        <View style={{flexDirection:'row'}}> 
          <TouchableOpacity onPress={navigation.openDrawer}>
          <Image source={require("../assets/Gold-Wings-Logo.png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>School Time</Text>
        </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf:'center',color: '#FFCC00', alignContent:'center',marginLeft: 20}}>Profile</Text>
                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10}}>
                  <TextInput
                  //  placeholder='Email'
                    placeholderTextColor={'black'}
                    containerStyle={{marginTop: 10}}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />

                </View>

                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10}}>
                  
                  <TextInput
                  //  placeholder='Name'
                    placeholderTextColor={'black'}
                    containerStyle={{marginTop: 10}}
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />

                </View>

                <View style={{alignSelf:'center',justifyContent:'center',alignContent:'center',width:width-20,borderRadius:30,borderWidth:1,margin:10}}>
                  
                  <TextInput
                  placeholder='DOB'
                    placeholderTextColor={'grey'}
                    containerStyle={{marginTop: 10}}
                    value={dob}
                    onChangeText={(text) => setDOB(text)}
                  />

                </View>
                {/* <TouchableOpacity onPress={()=>saveData()} style={{alignSelf:'center',backgroundColor:'grey',width:200,height:50}}>
                  <Text>Save Profile Info</Text>
                </TouchableOpacity> */}


                <TouchableOpacity onPress={()=>updateData()} style={{alignSelf:'center',backgroundColor:'grey',width:200,height:50}}>
                  <Text>Update Profile Info</Text>
                </TouchableOpacity>
      </View>
 
   
  );

};





// import { StyleSheet, Text, View,TextInput } from 'react-native'
// import React, { useState,useEffect } from 'react'
// import { db, doc, auth, getDoc} from "../firebase"
// const Profile = () => {
//   const[email,setEmail]=useState(null);
 
//   useEffect(() => {
   
//     ReadData();
//   }, []);
//   const ReadData=async()=>{
//     const docRef = doc(db, "user", auth.currentUser.uid);
//     const docSnap = await getDoc(docRef);
//     console.log("DocSnap", docSnap.data())

//     if (docSnap.exists()){
//       //setName(docSnap.data().name);
//       setEmail(docSnap.data().email)
//       console.log("Email",email)

//     }
//     else{
//       alert("No data!")
//     }
//   }
//   return (
//     <View>
//       <Text>Profile</Text>
//       <TextInput
//                     placeholder='Email'
//                     placeholderTextColor={'black'}
//                     containerStyle={{marginTop: 10}}
//                     value={email}
//                     onChangeText={(text) => setEmail(text)}
//                   />
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})