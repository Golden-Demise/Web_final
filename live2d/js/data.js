const firebaseConfig = {
  apiKey: "AIzaSyA9KdxVEPhhrF8E2IrtiIC550fM6cI7EqI",
  authDomain: "webfinal-75cc4.firebaseapp.com",
  projectId: "webfinal-75cc4",
  storageBucket: "webfinal-75cc4.appspot.com",
  messagingSenderId: "907654408665",
  appId: "1:907654408665:web:60851c1916e12c143951c8",
  measurementId: "G-95GSC7601Y"
};

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const $moreCan=$("#moreCan");
const $All=$("#All");
const $total=$("#total");
const $client=$("#client");
const $clientAll=$("#clientAll");
const $talkbtn=$("#talkbtn");
const $talkinput=$("#talkinput");

var global_can=0;
var client_all_can=0;
var client_can=0;

const cat = db.collection("cat").doc("0");

async function getcan(){
  const todoDocs = await cat.get();
  const {can,talk} = todoDocs.data();

  const user = firebase.auth().currentUser;
  const cl = db.collection("user").doc(user.uid);
  const ctemp=await cl.get();
  const {can_all}=ctemp.data();
  $clientAll.text("總貢獻的罐罐："+String(can_all));
  
  console.log(can);
  $All.text("我的罐罐："+String(can));
  $total.text("Total："+String(can));
}
getcan();


$moreCan.on('click',async(event)=>{
  event.preventDefault();
  //get Data
  const todoDocs = await cat.get();
  const {can,talk} = todoDocs.data();
  global_can=can;
  global_can+=1;
  
  const user = firebase.auth().currentUser;
  const cl = db.collection("user").doc(user.uid);
  console.log(user.uid);
  const ctemp=await cl.get();
  const {can_all}=ctemp.data();
  console.log(can_all);
  client_all_can=can_all;
  client_all_can+=1;
  $clientAll.text("總貢獻的罐罐："+String(client_all_can));
  db.collection("user").doc(user.uid).set({
    can_all:client_all_can
  });
  
  console.log(can);
  //console.log(talk);
  client_can+=1;
  //print
  $All.text("我的罐罐："+String(global_can));
  $client.text("貢獻的罐罐："+String(client_can));
  cat.set({
    can:global_can,
    talk:talk
  });
})

$talkbtn.on('click',async(event) => {
  event.preventDefault();
  const t=$talkinput.val();
  if(t==""){
    alert('沒有輸入');
  }
  else{
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    global_can=can;
    talk.push(t);
    cat.set({
      can:global_can,
      talk:talk
    });
    alert('新增成功');
    console.log(talk);
    $talkinput.text("");
    $talkinput.val("");
    setTimeout(function(){
      window.location.reload();
    },5000);
  }
})
