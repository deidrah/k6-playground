import http from 'k6/http';
import {check} from 'k6';

export default function() {
  let url = 'https://run.mocky.io/v3/e77a9467-c334-4417-84ca-71a052ba6399';
  let param = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  let payload = JSON.stringify({
    email: 'abc@gmail.com',
    password: '123'
  })
  let response = http.post(url, param, payload);
}