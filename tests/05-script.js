import http from 'k6/http';
import {check} from 'k6';

export default function() {
  let url = 'https://run.mocky.io/v3/ead57353-257a-4941-8820-6cd745eee37b';
  
  let headerParam = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = http.get(url, headerParam);

  check(response, {
    'is status 200:': (r) => r.status === 200,
  })
  let body = JSON.parse(response.body);
  console.log(`response body is ${JSON.stringify(body)}`)
  console.log(`Message is ${body.Message}`)
  check(response, {
    'is Message Success ' : (r) => JSON.parse(r.body).Message === "Data fetched successfully",
 })
}