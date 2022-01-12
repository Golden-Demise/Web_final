const $clear=$("#clear");
const $add100=$("#add100");
const $add1000=$("#add1000");
const $add10000=$("#add10000");

$clear.on('click',async(event)=>{
    event.preventDefault();
    //get Data
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    global_can=can;
    global_can=0;
    console.log(can);
    //console.log(talk);
    //print
    $All.text("我的罐罐："+String(global_can));
    $total.text("Total："+String(can));
    cat.set({
      can:global_can,
      talk:talk
    });
})

$add100.on('click',async(event)=>{
    event.preventDefault();
    //get Data
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    global_can=can;
    global_can+=100;
    console.log(can);
    //console.log(talk);
    //print
    $All.text("我的罐罐："+String(global_can));
    $total.text("Total："+String(can));
    cat.set({
      can:global_can,
      talk:talk
    });
})

$add1000.on('click',async(event)=>{
    event.preventDefault();
    //get Data
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    global_can=can;
    global_can+=1000;
    console.log(can);
    //console.log(talk);
    //print
    $All.text("我的罐罐："+String(global_can));
    $total.text("Total："+String(can));
    cat.set({
      can:global_can,
      talk:talk
    });
})

$add10000.on('click',async(event)=>{
    event.preventDefault();
    //get Data
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    global_can=can;
    global_can+=10000;
    console.log(can);
    //console.log(talk);
    //print
    $All.text("我的罐罐："+String(global_can));
    $total.text("Total："+String(can));
    cat.set({
      can:global_can,
      talk:talk
    });
})
const $scTableBody=$("#scTableBody");

//sentence
async function getsc(){
    const todoDocs = await cat.get();
    const {can,talk} = todoDocs.data();
    for (let i=0; i<talk.length; i++){
        const row=`
            <tr>
                <td>${i}</td>
                <td>
                    ${talk[i]}
                </td>
                <td>
                    <button data-id="${i}" class="btn btn-danger delete-btn">Delete</button>
                </td>
            </tr>
        `;
        $scTableBody.append(row);
    }
    console.log(talk);
}
getsc();

$('body').delegate(".delete-btn", "click",async function () {
    console.log(this);
    const todoDocs =await cat.get();
    const {can,talk} = todoDocs.data();
    const temp=talk;
    temp.splice($(this).attr("data-id"),1);

    cat.set({
        can:can,
        talk:temp
    });
    getsc();
});