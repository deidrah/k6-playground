import http from 'k6/http';
import { check } from 'k6';

export default function() {
  //let response = http.get('https://run.mocky.io/v3/2e9dacc9-577c-4d57-81b1-b4d21f6d9c82');
  let response = http.get('https://run.mocky.io/v3/9a7f93f2-c6d7-472f-a852-0e43c9300bf2');
  console.log(`response body length ${response.body.length} for VU= ${__VU} iteration = ${__ITER}`)
  
  check(response, {
    'is reponse status 200 :' : (r) => r.status === 200,
    'body size is 0 bytes :' : (r) => r.body.length == 38,
  })
}