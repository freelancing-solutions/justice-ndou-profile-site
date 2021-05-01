

function setup(){
    noCanvas();
    const data = tf.tensor([0,0,127,255],[2,2]);
    data.print();
    //console.log(data.toString());
}