import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let reponse = http.get('https://run.mocky.io/v3/2e9dacc9-577c-4d57-81b1-b4d21f6d9c82');
  check(reponse, {
    'is reponse status 200 :' : (r) => r.status === 200,
  })
}