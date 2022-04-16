
//1.init - initialize variables, define options
let counter = 1
// 2.steup-called once before load test starts
export function setup(){
  console.log(`Inside steup - ${counter}`)
}
// 3.default - it is main function, entry point for virtual users.VU keeps on calling APIs defined here
export default function() {
  console.log(`Inside setup - ${counter}`)
}

//4.teardown (cleanup) gets called once after default funtion is over
export function teardown(){

}