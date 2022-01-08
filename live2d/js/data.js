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
const $talkbtn=$("#talkbtn");
const $talkinput=$("#talkinput");

var global_can=0;
var client_can=0;

const cat = db.collection("cat").doc("0");

async function getcan(){
  const todoDocs = await cat.get();
  const {can,talk} = todoDocs.data();
  console.log(can);
  $All.text("我的罐罐："+String(can));
  $total.text("Total："+String(can));
}
setInterval(getcan,100);

$moreCan.on('click',async(event)=>{
  event.preventDefault();
  //get Data
  const todoDocs = await cat.get();
  const {can,talk} = todoDocs.data();
  global_can=can;
  global_can+=1;
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
  }
})