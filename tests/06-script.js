import http from 'k6/http';
import {check} from 'k6';

export default function() {
  let response = http.get('https://run.mocky.io/v3/3dc8c6e5-cb89-4ff5-a06a-672209d1e4b6');
  let body = JSON.parse(response.body)
  body.forEach(element => {
    console.log(`name is ${element.name}`)
  });
  check(response, {
    'is status 200:': (r) => r.status === 200,
  })
 
}